export const initialState = {
    products: [
        {
            id:'1',
            name:'PowerCube',
            inverter:'500',
            battery:'960',
            price1: '250000',
            price2: '330000',
            description:'The PowerCube , a portable Powerstattion with battery capacity of 960Wh and output Power of 500W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 10hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/6899052/1.jpg?8665','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/6899052/3.jpg?8088','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/83/6899052/6.jpg?8088'],
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
                    hours:'33 hours'
                }
            ]
         },


        {
            id:'2',
            name:'PowerCubeX',
            inverter:'1000',
            battery:'1800',
            price1: '500000',
            price2: '800000',
            description:'The PowerCube X, a portable Powerstattion with battery capacity of 1800Wh and output Power of 1000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 12 hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/65/6514162/1.jpg?0647','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/65/6514162/2.jpg?1861','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/65/6514162/3.jpg?1861'],
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
                    hours:'180 hours'
                },
                {
                    device:'Fan',
                    img:'/icons/fan-cooler-svgrepo-com.svg',
                    rating:'45W',
                    hours:'40 hours'
                },
                {
                    device:'TV',
                    img:'/icons/tv-monitor-svgrepo-com.svg',
                    rating:'150W',
                    hours:'12 hours'
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
                    hours:'60 hours'
                },
                {
                    device:'Fridge',
                    img:'/icons/fridge-svgrepo-com.svg',
                    rating:'300W',
                    hours:'6 hours'
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
            name:'PowerCubeXtra',
            inverter:'3000',
            battery:'5000',
            price1: '2000000',
            price2: '3000000',
            description:'The PowerCube Xtra is a portable Powerstattion with battery capacity of over 5000Wh and output Power up to 3000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/95/6514162/1.jpg?1862','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/95/6514162/2.jpg?1862','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/95/6514162/3.jpg?1862'],
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
            name:'PowerCubeTitan',
            inverter:'5000',
            battery:'5000',
            price1: '2500000',
            price2: '4000000',
            description:'The PowerCube Titan is a portable Powerstattion with battery capacity of over 5000Wh and output Power up to 5000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/45/8142752/1.jpg?6522','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/45/8142752/2.jpg?4165','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/45/8142752/3.jpg?4165'],
            length:'55in(110cm)',
            width:'55in(110cm)',
            height:'55in(110cm)',
            weight:'55lbs(110kg)',
            AcCharging:'11hours',
            solarCharging:'11hours',
            solarPanels:'12', 
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
            name:'PowerCubeTitan2',
            inverter:'5000',
            battery:'10000',
            price1: '4000000',
            price2: '5500000',
            description:'The PowerCube Titan2 is a portable Powerstattion with battery capacity of over 10000Wh and output Power up to 5000W. Longer battery life that supports your daily needs. The power station can power your homes, shops and even support you for up to 18hours during blackouts. Charge quickly with Solar or AC (Nepa)',
            image:['https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/05/8142752/1.jpg?4575','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/05/8142752/2.jpg?0951','https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/05/8142752/3.jpg?0951'],
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
                    hours:'332 hours'
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
    user:null
};

export const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {  };
      case 'DECREMENT':
        return {  };
      default:
        return state;
    }
  }; 
