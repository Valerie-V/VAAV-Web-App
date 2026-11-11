import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { naira } from "@/lib/format";
import { getBasketTotal } from "@/context/reducer";
import { useStateValue } from "@/context/StateProvider";
import { submitNetlifyForm } from "@/lib/netlifyForms";

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT (Abuja)', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara',
];

function SubTotal({ onPaid }) {
  const [{ basket }, dispatch] = useStateValue();
  const total = getBasketTotal(basket);
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    address: "",
  });

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  async function handleCheckout() {
    if (basket.length === 0) {
      setMessage("Your cart is empty. Please add items to your cart before checking out.");
      return;
    }
    setMessage("");

    // Snapshot the order now, since the basket is cleared after payment.
    const items = basket.map(({ name, price, qty }) => ({ name, price, qty }));
    const itemsText = items.map(i => `${i.name} x${i.qty} (₦${(i.price * i.qty).toLocaleString()})`).join('\n');
    const deliveryAddress = `${formData.address}, ${formData.state}`;

    // Loaded on demand: the Paystack library needs `window`, so importing it at
    // the top of the file crashes server rendering of the checkout page.
    let PaystackPop;
    try {
      ({ default: PaystackPop } = await import("@paystack/inline-js"));
    } catch (err) {
      console.error(err);
      setMessage("Couldn't load the payment window. Check your connection and try again.");
      return;
    }
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYMENT_KEY,
      email: formData.email,
      phone: formData.phone,
      amount: total * 100,
      currency: "NGN",
      // Shown on the transaction in the Paystack dashboard.
      metadata: {
        custom_fields: [
          { display_name: "Full name", variable_name: "full_name", value: formData.fullName },
          { display_name: "Phone", variable_name: "phone", value: formData.phone },
          { display_name: "Delivery address", variable_name: "delivery_address", value: deliveryAddress },
          { display_name: "Items", variable_name: "items", value: itemsText },
        ],
      },
      onSuccess: (response) => {
        // Record the order for the team. A failure here must not block the
        // customer, who has already paid; Paystack still holds the record.
        submitNetlifyForm("order", {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          state: formData.state,
          delivery_address: formData.address,
          items: itemsText,
          total,
          paystack_reference: response.reference,
        }).catch((err) => console.error("Could not record order:", err));

        dispatch({ type: "CLEAR_BASKET" });
        onPaid({ reference: response.reference, items, total, phone: formData.phone });
      },
      onCancel: () => {
        setMessage("Payment cancelled. Your cart has been kept, so you can try again.");
      },
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPaying(true);
    try {
      await handleCheckout();
    } finally {
      setPaying(false);
    }
  };

  return (
    <aside className="card p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-bold">Order summary</h2>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-medium">{naira(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Delivery & installation</dt>
          <dd className="text-muted">Arranged after payment</dd>
        </div>
        <div className="flex justify-between border-t border-line/10 pt-3 text-lg font-bold">
          <dt>Total</dt>
          <dd>{naira(total)}</dd>
        </div>
      </dl>

      <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col gap-4 border-t border-line/10 pt-6">
        <h3 className="flex items-center gap-2 font-semibold">
          <LocalShippingOutlinedIcon fontSize="small" className="text-pop" /> Delivery details
        </h3>
        <div>
          <label htmlFor="co-name" className="label">Full name</label>
          <input id="co-name" type="text" autoComplete="name" value={formData.fullName} onChange={update("fullName")} required className="input" />
        </div>
        <div>
          <label htmlFor="co-email" className="label">Email</label>
          <input id="co-email" type="email" autoComplete="email" value={formData.email} onChange={update("email")} required className="input" />
        </div>
        <div>
          <label htmlFor="co-phone" className="label">Phone number</label>
          <input id="co-phone" type="tel" autoComplete="tel" value={formData.phone} onChange={update("phone")} required className="input" />
        </div>
        <div>
          <label htmlFor="co-state" className="label">State</label>
          <select id="co-state" value={formData.state} onChange={update("state")} required className="input">
            <option value="" disabled>Select your state</option>
            {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="co-address" className="label">Delivery address</label>
          <input id="co-address" type="text" autoComplete="street-address" value={formData.address} onChange={update("address")} required className="input" />
        </div>

        {message && <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-300" role="alert">{message}</p>}

        <button type="submit" disabled={paying} className="btn-primary mt-2 w-full py-3.5 text-base">
          <LockOutlinedIcon sx={{ fontSize: 18 }} /> {paying ? "Opening payment…" : `Pay ${naira(total)}`}
        </button>
        <p className="text-center text-xs text-muted">Secure payment by Paystack</p>
      </form>
    </aside>
  );
}

export default SubTotal;
