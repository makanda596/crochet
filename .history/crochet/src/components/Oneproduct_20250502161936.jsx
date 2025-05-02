import React, { useState } from 'react';

const Product = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.image);

  return (
    <div>
      <img
        src={mainImage}
        alt="Main product"
        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
      />
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        {[product.optionalImage1, product.optionalImage2].map((img, index) => (
          img && (
            <img
              key={index}
              src={img}
              alt={`Optional ${index + 1}`}
              style={{ width: '80px', height: '80px', cursor: 'pointer', border: '1px solid #ccc' }}
              onClick={() => setMainImage(img)}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Product;
