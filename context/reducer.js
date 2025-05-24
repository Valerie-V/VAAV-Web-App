export const initialState = {
    audit:[],
    basket:[],
    products: [
        {
            id:'1',
            name:['PowerCube','PowerCube+Solar'],
            inverter:'500',
            battery:'960',
            price1: 350000,
            price2: 550000,
            description:'The PowerCube , a portable Powerstattion with battery capacity of 960Wh and output Power of 500W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 10hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['/product_Img/PHOTO-2025-03-05-11-16-32 (1).jpg','/product_Img/PHOTO-2025-03-05-11-16-32.jpg', '/product_Img/PHOTO-2025-03-05-11-16-32.jpg'],
            length:'12in(24cm)',
            width:'12in(24cm)',
            height:'12in(24cm)',
            weight:'12lbs(12kg)',
            AcCharging:'2hours',
            solarCharging:'3hours',
            solarPanels:'1', 
            power:[
                {
                    device:'Light',
                    img:'/icons/bulb-svgrepo-com.svg',
                    rating:'10W',
                    hours:'96 hours'
                },
                {
                    device:'Fan',
                    img:'/icons/fan-cooler-svgrepo-com.svg',
                    rating:'45W',
                    hours:'20 hours'
                },
                {
                    device:'TV',
                    img:'/icons/tv-monitor-svgrepo-com.svg',
                    rating:'150W',
                    hours:'6 hours'
                },
                {
                    device:'Laptop',
                    img:'/icons/laptop-svgrepo-com.svg',
                    rating:'65W',
                    hours:'15 hours'
                },
                {
                    device:'Phone',
                    img:'/icons/phone-svgrepo-com.svg',
                    rating:'30W',
                    hours:'33 Charges'
                }
            ]
         },


        {
            id:'2',
            name:['PowerCubeX','powerCubeX+Solar'],
            inverter:'2000',
            battery:'2400',
            price1: 1200000,
            price2: 1600000,
            description:'The PowerCube X, a portable Powerstattion with battery capacity of 2400Wh and output Power of 2000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 12 hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['/product_Img/Powercube-iso.jpeg','/product_Img/Powercube-front.jpeg', '/product_Img/Powercube-iso.jpeg'],
            length:'22in(35cm)',
            width:'22in(35cm)',
            height:'22in(35cm)',
            weight:'22lbs(35kg)',
            AcCharging:'5hours',
            solarCharging:'6hours',
            solarPanels:'3', 
            power:[
                {
                    device:'Light',
                    img:'/icons/bulb-svgrepo-com.svg',
                    rating:'10W',
                    hours:'180+ hours'
                },
                {
                    device:'Fan',
                    img:'/icons/fan-cooler-svgrepo-com.svg',
                    rating:'45W',
                    hours:'40+ hours'
                },
                {
                    device:'TV',
                    img:'/icons/tv-monitor-svgrepo-com.svg',
                    rating:'150W',
                    hours:'12+ hours'
                },
                {
                    device:'Laptop',
                    img:'/icons/laptop-svgrepo-com.svg',
                    rating:'65W',
                    hours:'15+ hours'
                },
                {
                    device:'Phone',
                    img:'/icons/phone-svgrepo-com.svg',
                    rating:'30W',
                    hours:'60+ Charges'
                },
                {
                    device:'Fridge',
                    img:'/icons/fridge-svgrepo-com.svg',
                    rating:'300W',
                    hours:'6+ hours'
                },
                {
                    device:'Blender',
                    img:'/icons/blender-svgrepo-com.svg',
                    rating:'600W',
                    hours:'3 hours'
                }
            ]
         },
        {
            id:'3',
            name:['PowerCubeXtra','PowerCubeXtra+Solar'],
            inverter:'3500',
            battery:'5000',
            price1: 2200000,
            price2: 2800000,
            description:'The PowerCube Xtra is a portable Powerstattion with battery capacity of over 5000Wh and output Power up to 3500W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['/product_Img/Xtra.png','/product_Img/Xtra-iso.jpeg','/product_Img/Xtra.png'],
            length:'45in(90cm)',
            width:'45in(90cm)',
            height:'45in(90cm)',
            weight:'45lbs(90kg)',
            AcCharging:'9hours',
            solarCharging:'9hours',
            solarPanels:'6', 
            power:[
                {
                    device:'Light',
                    img:'/icons/bulb-svgrepo-com.svg',
                    rating:'10W',
                    hours:'500 hours'
                },
                {
                    device:'Fan',
                    img:'/icons/fan-cooler-svgrepo-com.svg',
                    rating:'45W',
                    hours:'110 hours'
                },
                {
                    device:'TV',
                    img:'/icons/tv-monitor-svgrepo-com.svg',
                    rating:'150W',
                    hours:'30 hours'
                },
                {
                    device:'Laptop',
                    img:'/icons/laptop-svgrepo-com.svg',
                    rating:'65W',
                    hours:'76 hours'
                },
                {
                    device:'Phone',
                    img:'/icons/phone-svgrepo-com.svg',
                    rating:'30W',
                    hours:'166 hours'
                },
                {
                    device:'Microwave',
                    img:'/icons/microwave-2-svgrepo-com.svg',
                    rating:'960W',
                    hours:'5 hours'
                },
                {
                    device:'Electric Iron',
                    img:'/icons/electric-iron-variant-with-wire-svgrepo-com.svg',
                    rating:'2000W',
                    hours:'2.5 hours'
                },
                {
                    device:'Fridge',
                    img:'/icons/fridge-svgrepo-com.svg',
                    rating:'300W',
                    hours:'16 hours'
                },
                {
                    device:'Blender',
                    img:'/icons/blender-svgrepo-com.svg',
                    rating:'600W',
                    hours:'8 hours'
                }
            ]
         },
        {
            id:'4',
            name:['PowerCubeTitan','PowerCubeTitan+Solar'],
            inverter:'5000',
            battery:'5000',
            price1: 2400000,
            price2: 3200000,
            description:'The PowerCube Titan is a portable Powerstattion with battery capacity of over 5000Wh and output Power up to 5000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['/product_Img/Titan.jpeg','/product_Img/Titan.jpeg','/product_Img/Titan.jpeg'],
            length:'55in(110cm)',
            width:'55in(110cm)',
            height:'55in(110cm)',
            weight:'55lbs(110kg)',
            AcCharging:'3-4 hours',
            solarCharging:'3 hours',
            solarPanels:'8', 
            power:[
                {
                    device:'Light',
                    img:'/icons/bulb-svgrepo-com.svg',
                    rating:'10W',
                    hours:'500 hours'
                },
                {
                    device:'Fan',
                    img:'/icons/fan-cooler-svgrepo-com.svg',
                    rating:'45W',
                    hours:'110 hours'
                },
                {
                    device:'TV',
                    img:'/icons/tv-monitor-svgrepo-com.svg',
                    rating:'150W',
                    hours:'30 hours'
                },
                {
                    device:'Laptop',
                    img:'/icons/laptop-svgrepo-com.svg',
                    rating:'65W',
                    hours:'76 hours'
                },
                {
                    device:'Phone',
                    img:'/icons/phone-svgrepo-com.svg',
                    rating:'30W',
                    hours:'166 Charges'
                },
                {
                    device:'Microwave',
                    img:'/icons/microwave-2-svgrepo-com.svg',
                    rating:'960W',
                    hours:'5 hours'
                },
                {
                    device:'Electric Iron',
                    img:'/icons/electric-iron-variant-with-wire-svgrepo-com.svg',
                    rating:'2000W',
                    hours:'2.5 hours'
                },
                {
                    device:'Fridge',
                    img:'/icons/fridge-svgrepo-com.svg',
                    rating:'300W',
                    hours:'16 hours'
                },
                {
                    device:'Blender',
                    img:'/icons/blender-svgrepo-com.svg',
                    rating:'600W',
                    hours:'8 hours'
                },
                {
                    device:'Pumping Machine',
                    img:'/icons/tap-water-drink-water-tap-svgrepo-com.svg',
                    rating:'2000W',
                    hours:'2 hours'
                }
            ]
         },
        {
            id:'5',
            name:['PowerCubeTitanX','PowerCubeTitanX+Solar'],
            inverter:'5000',
            battery:'10000',
            price1: 3200000,
            price2: 4000000,
            description:'The PowerCube TitanX is a portable Powerstattion with battery capacity of over 10000Wh and output Power up to 5000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['/product_Img/Titan-old.jpeg','/product_Img/Titan-old.jpeg','/product_Img/Titan-old.jpeg'],
            length:'100in(200cm)',
            width:'100in(200cm)',
            height:'100in(200cm)',
            weight:'100lbs(200kg)',
            AcCharging:'20hours',
            solarCharging:'20hours',
            solarPanels:'12', 
            power:[
                {
                    device:'Light',
                    img:'/icons/bulb-svgrepo-com.svg',
                    rating:'10W',
                    hours:'1000 hours'
                },
                {
                    device:'Fan',
                    img:'/icons/fan-cooler-svgrepo-com.svg',
                    rating:'45W',
                    hours:'220 hours'
                },
                {
                    device:'TV',
                    img:'/icons/tv-monitor-svgrepo-com.svg',
                    rating:'150W',
                    hours:'60 hours'
                },
                {
                    device:'Laptop',
                    img:'/icons/laptop-svgrepo-com.svg',
                    rating:'65W',
                    hours:'152 hours'
                },
                {
                    device:'Phone',
                    img:'/icons/phone-svgrepo-com.svg',
                    rating:'30W',
                    hours:'332 Charges'
                },
                {
                    device:'Microwave',
                    img:'/icons/microwave-2-svgrepo-com.svg',
                    rating:'960W',
                    hours:'10 hours'
                },
                {
                    device:'Electric Iron',
                    img:'/icons/electric-iron-variant-with-wire-svgrepo-com.svg',
                    rating:'2000W',
                    hours:'5 hours'
                },
                {
                    device:'Fridge',
                    img:'/icons/fridge-svgrepo-com.svg',
                    rating:'300W',
                    hours:'32 hours'
                },
                {
                    device:'Blender',
                    img:'/icons/blender-svgrepo-com.svg',
                    rating:'600W',
                    hours:'16 hours'
                },
                {
                    device:'Pumping Machine',
                    img:'/icons/tap-water-drink-water-tap-svgrepo-com.svg',
                    rating:'2000W',
                    hours:'4 hours'
                }
            ]
         },
        
    ],
};



export const getBasketTotal = (basket) => {
    let price = basket?.map((item) => item.price * item.qty);
    return price.reduce((amount, item) => item + amount, 0);
  };

export const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ITEMS':
        return { 
            ...state,
            basket:action.payload
         };
      case 'ADD_TO_BASKET':
        const isItemInBasket = state.basket.some(item => item.name === action.payload.name);
            if (isItemInBasket){
            return state;
            } else
                return { 
            ...state,
            basket:[...state.basket,  action.payload]
         };
      case 'ADD_TO_AUDIT':
        const isItemInAudit = state.audit.some(item => item.id === action.payload.id);
            if (isItemInAudit){
            return state;
            } else
                return { 
            ...state,
            audit:[...state.audit,  action.payload]
         };
      case 'REMOVE_FROM_BASKET':
        return { 
            
            ...state,
            basket:state.basket.filter(item => item.name!== action.payload)
         };
      case 'REMOVE_FROM_AUDIT':
        return { 
            
            ...state,
            audit:state.audit.filter(item => item.id!== action.payload)
         };
         case 'UPDATE_BASKET_ITEM':
            const { name, qty } = action.payload;
            return {
              ...state,
              basket: state.basket.map(item =>
                item.name === name ? { ...item, qty: qty } : item
              )
            };
      default:
        return state;
    }
  }; 
