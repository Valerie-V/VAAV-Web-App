import React, { useState, useEffect } from "react";
import styled from "styled-components";
// Components
import ProjectBox from "../Elements/ProjectBox";
import PopupFeatures from "../Elements/PopupFeatures";
import PopUpStats from "../Elements/PopUpStats";
import CheckoutProceed from "../Elements/CheckoutProceed";
// Assets
import ProjectImg1 from "../../assets/img/projects/1.png";
import ProjectImg2 from "../../assets/img/projects/2.png";
import ProjectImg3 from "../../assets/img/projects/3.png";
import ProjectImg4 from "../../assets/img/projects/4.jpeg";
import ProjectImg5 from "../../assets/img/projects/5.jpeg";
//useContext, useCart hook
import { useCart } from ".//CartContext";

const Popup = ({ isVisible, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showPop, setShowPop] = useState(false);
  const [isSolar, setIsSolar] = useState(false);
  const [price, setPrice] = useState('');
  const { addToCart } = useCart();

  useEffect(()=>{
    if (product){
      setPrice(product.price)
    }
  }, [product]);

  if (!isVisible || !product) return null;


  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, isSolar);
    setShowPop(true)
  };

  const handleAlone = () => {
    setPrice(product.price)
    setIsSolar(false);
  };

  const handleWithSolar = () => {
    setIsSolar(true);
    const numericPrice = Number(product.price.replace(/[^0-9]/g, ''));
    const totalPrice = `₦ ${ (numericPrice + product.solar).toLocaleString() }`;
    setPrice(totalPrice)
  };


  const renderSpecifications = (specs) => {
    return Object.entries(specs).map(([category, items]) => (
      <div key={category} className="specs-section">
        <h3>{category}</h3>
        <div className="specs-grid">
          {Object.entries(items).map(([label, value]) => (
            <div key={label} className="specs-item">
              <span className="specs-label">{label}:</span>
              <span className="specs-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="overlay">
      <div className="popup">
        <div className="fixedHeader">
          <button className="close-btn" onClick={() => {onClose(); setShowPop(false)}}>&times;</button>
          <h2 className="title">{product.title}</h2>
        </div>
        <div className="content">
          <img src={product.img} alt={product.title} className="product-image" />
          <div className="details">
            <p className="price">{price}</p>
            <div className="button-group">
              <button className="btn dark-green" onClick={handleAlone}>ALONE</button>
              <button className="btn dark-green" onClick={handleWithSolar}>WITH SOLAR</button>
            </div>
            <div className="button-group">
              <button className="btn yellow" disabled>RENT</button>
              <button className="btn dark-green" onClick={handleAddToCart}>ADD TO CART</button>
            </div>
            <div className="quantity">
              <button className="qty-btn" onClick={decreaseQuantity}>-</button>
              <span className="qty">{quantity}</span>
              <button className="qty-btn" onClick={increaseQuantity}>+</button>
            </div>
          </div>
        </div>

        <CheckoutProceed showPop={showPop}/>

        <div className="description">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              DESCRIPTION
            </button>
            <button
              className={`tab ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              SPECIFICATIONS
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'description' ? (
              <div>
                <p>{product.text}</p>
                <PopUpStats id={product.title} />
                <PopupFeatures />
              </div>
            ) : (
              <div className="specs-content">
                {renderSpecifications(product.specifications)}
              </div>
            )}
          </div>
        </div>
      </div> 
    </div> 
  );
};


export default function Products() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product data with prices and specifications
  const products = [
    {
      img: ProjectImg1,
      title: "PowerCube",
      solar: 315000,
      text: "The PowerCube, a portable Powerstation with battery capacity of 960Wh and output Power of 500W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 10hours during blackouts. Charge quickly with Solar or AC (Nepa)",
      price: "₦ 385,000",
      specifications: {
        Battery: {
          "Capacity": "5000",
          "Cell Chemistry": "FP (LiFePO4 battery)",
          "Cycle life": "4000 cycles to 70%+ capacity"
        },
        Ports: {
          "AC Output": "230V~ 50Hz, 25A Max, AC",
          "AC Input": "120V, 60Hz, 15A Max",
          "DC Input": "11V-17.5V, 8A Max, Double to 8A Max 17.5V-60V"
        },
        Dimensions: {
          "Length": "45in(90cm)",
          "Width": "45in(90cm)",
          "Height": "45in(90cm)",
          "Weight": "45lbs(90kg)"
        },
        "Charging Time(0-100%)": {
          "AC Adapter": "9hours",
          "Solar Panel": "9hours"
        },
        General: {
          "Warranty": "2 Years"
        },
        "Solar Panel Combination": {
          "180 W Panel": "6panels"
        }
      }
    },
    {
      img: ProjectImg2,
      title: "PowerCubeX",
      solar: 720000,
      text: "The PowerCube X, a portable Powerstation with battery capacity of 1800Wh and output Power of 1000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 12 hours during blackouts. Charge quickly with Solar or AC (Nepa)",
      price: "₦ 880,000",
      specifications: {
        Battery: {
            "Capacity": "1800",
            "Cell Chemistry": "FP (LiFePO4 battery)",
            "Cycle life": "4000 cycles to 70%+ capacity"
        },
        Ports: {
            "AC Output": "230V~ 50Hz, 25A Max, AC",
            "AC Input": "120V, 60Hz, 15A Max",
            "DC Input": "11V-17.5V, 8A Max, Double to 8A Max 17.5V-60V"
        },
        Dimensions: {
            "Length": "22in(35cm)",
            "Width": "22in(35cm)",
            "Height": "22in(35cm)",
            "Weight": "22lbs(35kg)"
        },
        "Charging Time(0-100%)": {
            "AC Adapter": "5hours",
            "Solar Panel": "6hours"
        },
        General: {
            "Warranty": "2 Years"
        },
        "Solar Panel Combination": {
            "180 W Panel": "3panels"
        }
      }
    },
    {
      img: ProjectImg3,
      title: "PowerCubeXtra",
      solar: 1600000,
      text: "The PowerCube Xtra is a portable Powerstation with battery capacity of over 5000Wh and output Power up to 3000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)",
      price: "₦ 2,200,000",
      specifications: {
        Battery: {
            "Capacity": "5000",
            "Cell Chemistry": "FP (LiFePO4 battery)",
            "Cycle life": "4000 cycles to 70%+ capacity"
        },
        Ports: {
            "AC Output": "230V~ 50Hz, 25A Max, AC",
            "AC Input": "120V, 60Hz, 15A Max",
            "DC Input": "11V-17.5V, 8A Max, Double to 8A Max 17.5V-60V"
        },
        Dimensions: {
            "Length": "45in(90cm)",
            "Width": "45in(90cm)",
            "Height": "45in(90cm)",
            "Weight": "45lbs(90kg)"
        },
        "Charging Time(0-100%)": {
            "AC Adapter": "9hours",
            "Solar Panel": "9hours"
        },
        General: {
            "Warranty": "2 Years"
        },
        "Solar Panel Combination": {
            "180 W Panel": "6panels"
        }
      }
    },
    {
      img: ProjectImg4,
      title: "PowerCubeTitan",
      solar: 1000000,
      text: "The PowerCube Titan is a portable Powerstation with battery capacity of over 5000Wh and output Power up to 5000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)",
      price: "₦ 2,900,000",
      specifications: {
        Battery: {
            "Capacity": "5000",
            "Cell Chemistry": "FP (LiFePO4 battery)",
            "Cycle life": "4000 cycles to 70%+ capacity"
        },
        Ports: {
            "AC Output": "230V~ 50Hz, 25A Max, AC",
            "AC Input": "120V, 60Hz, 15A Max",
            "DC Input": "11V-17.5V, 8A Max, Double to 8A Max 17.5V-60V"
        },
        Dimensions: {
            "Length": "55in(110cm)",
            "Width": "55in(110cm)",
            "Height": "55in(110cm)",
            "Weight": "55lbs(110kg)"
        },
        "Charging Time(0-100%)": {
            "AC Adapter": "11hours",
            "Solar Panel": "11hours"
        },
        General: {
            "Warranty": "2 Years"
        },
        "Solar Panel Combination": {
            "180 W Panel": "12panels"
        }
      }
    },
    {
      img: ProjectImg5,
      title: "PowerCubeTitanX",
      solar: 1000000,
      text: "The PowerCube TitanX is a portable Powerstation with battery capacity of over 10000Wh and output Power up to 5000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)",
      price: "₦ 4,500,000",
      specifications: {
        Battery: {
          "Capacity": "10000",
          "Cell Chemistry": "FP (LiFePO4 battery)",
          "Cycle life": "4000 cycles to 70%+ capacity"
      },
      Ports: {
          "AC Output": "230V~ 50Hz, 25A Max, AC",
          "AC Input": "120V, 60Hz, 15A Max",
          "DC Input": "11V-17.5V, 8A Max, Double to 8A Max 17.5V-60V"
      },
      Dimensions: {
          "Length": "100in(200cm)",
          "Width": "100in(200cm)",
          "Height": "100in(200cm)",
          "Weight": "100lbs(200kg)"
      },
      "Charging Time(0-100%)": {
          "AC Adapter": "20hours",
          "Solar Panel": "20hours"
      },
      General: {
          "Warranty": "2 Years"
      },
      "Solar Panel Combination": {
          "180 W Panel": "12panels"
      }
      }
    }
  ];

  const handleProductClick = (product) => {
    console.log("clicked", product.title);
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  return (
    <Wrapper id="projects">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Products</h1>
          </HeaderInfo>
          <div className="row textCenter">
            {products.map((product, index) => (
              <div key={index} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                <ProjectBox
                  img={product.img}
                  title={product.title}
                  text={product.text}
                  action={() => handleProductClick(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Popup */}
      <Popup 
        isVisible={isPopupVisible} 
        onClose={() => setPopupVisible(false)} 
        product={selectedProduct}
      />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  margin-top: clamp(40px, 10vw, 100px);
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;