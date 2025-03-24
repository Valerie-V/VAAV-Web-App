import React from 'react';
import styled from 'styled-components';

const powerCubeData = {
  PowerCube: {
    title: "PowerCube",
    features: [
      { icon: "💡", name: "Light", watts: "10W", duration: "96 hours" },
      { icon: "🌀", name: "Fan", watts: "45W", duration: "20 hours" },
      { icon: "📺", name: "TV", watts: "150W", duration: "6 hours" },
      { icon: "💻", name: "Laptop", watts: "65W", duration: "15 hours" },
      { icon: "📱", name: "Phone", watts: "30W", duration: "33 Charges" }
    ]
  },
  PowerCubeX: {
    title: "PowerCubeX",
    features: [
      { icon: "💡", name: "Light", watts: "10W", duration: "180 hours" },
      { icon: "🌀", name: "Fan", watts: "45W", duration: "40 hours" },
      { icon: "📺", name: "TV", watts: "150W", duration: "12 hours" },
      { icon: "💻", name: "Laptop", watts: "65W", duration: "15 hours" },
      { icon: "📱", name: "Phone", watts: "30W", duration: "60 Charges" },
      { icon: "❄️", name: "Fridge", watts: "300W", duration: "6 hours" },
      { icon: "🔄", name: "Blender", watts: "600W", duration: "3 hours" }
    ]
  },
  PowerCubeXtra: {
    title: "PowerCubeXtra",
    features: [
      { icon: "💡", name: "Light", watts: "10W", duration: "500 hours" },
      { icon: "🌀", name: "Fan", watts: "45W", duration: "110 hours" },
      { icon: "📺", name: "TV", watts: "150W", duration: "30 hours" },
      { icon: "💻", name: "Laptop", watts: "65W", duration: "76 hours" },
      { icon: "📱", name: "Phone", watts: "30W", duration: "166 Charges" },
      { icon: "♨️", name: "Microwave", watts: "960W", duration: "5 hours" },
      { icon: "❄️", name: "Fridge", watts: "300W", duration: "16 hours" },
      { icon: "🔄", name: "Blender", watts: "600W", duration: "8 hours" },
      { icon: "👕", name: "Electric Iron", watts: "2000W", duration: "2.5 hours" }
    ]
  },
  PowerCubeTitan:  {
    title: "PowerCubeTitan",
    features: [
      { icon: "💡", name: "Light", watts: "10W", duration: "500 hours" },
      { icon: "🌀", name: "Fan", watts: "45W", duration: "110 hours" },
      { icon: "📺", name: "TV", watts: "150W", duration: "30 hours" },
      { icon: "💻", name: "Laptop", watts: "65W", duration: "76 hours" },
      { icon: "📱", name: "Phone", watts: "30W", duration: "166 Charges" },
      { icon: "♨️", name: "Microwave", watts: "960W", duration: "5 hours" },
      { icon: "❄️", name: "Fridge", watts: "300W", duration: "16 hours" },
      { icon: "🔄", name: "Blender", watts: "600W", duration: "8 hours" },
      { icon: "👕", name: "Electric Iron", watts: "2000W", duration: "2.5 hours" },
      { icon: "🚰", name: "Pumping Machine", watts: "2000W", duration: "2.5 hours" },
    ]
  },
  PowerCubeTitanX:  {
    title: "PowerCubeTitanX",
    features: [
      { icon: "💡", name: "Light", watts: "10W", duration: "1000 hours" },
      { icon: "🌀", name: "Fan", watts: "45W", duration: "220 hours" },
      { icon: "📺", name: "TV", watts: "150W", duration: "60 hours" },
      { icon: "💻", name: "Laptop", watts: "65W", duration: "152 hours" },
      { icon: "📱", name: "Phone", watts: "30W", duration: "332 Charges" },
      { icon: "♨️", name: "Microwave", watts: "960W", duration: "10 hours" },
      { icon: "❄️", name: "Fridge", watts: "300W", duration: "32 hours" },
      { icon: "🔄", name: "Blender", watts: "600W", duration: "16 hours" },
      { icon: "👕", name: "Electric Iron", watts: "2000W", duration: "5 hours" },
      { icon: "🚰", name: "Pumping Machine", watts: "2000W", duration: "5 hours" },
    ]
  }
};

const PopupFeatures = ({id}) => {
  const data = powerCubeData[id]

  return (
    <FeaturesWrapper>
      <FeaturesGrid>
        {data.features.map((feature, index) => (
          <FeatureCard key={index}>
            <IconWrapper>{feature.icon}</IconWrapper>
            <FeatureInfo>
              <h4>{feature.name}</h4>
              <PowerDetails>
                <span className="watts">{feature.watts}</span>
                <span className="duration">{feature.duration}</span>
              </PowerDetails>
            </FeatureInfo>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesWrapper>
  );
};

const FeaturesWrapper = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;

  h3 {
    color: #0c6525;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #6c757d;
    margin-bottom: 1.5rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0;
    color: #343a40;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const PowerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;

  .watts {
    color: #0c6525;
    font-weight: 500;
  }

  .duration {
    color: #6c757d;
  }
`;

export default PopupFeatures;