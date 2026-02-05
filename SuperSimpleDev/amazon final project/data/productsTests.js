import { Product, Clothing, Appliance } from '../../data/products.js';

describe('test suite: Product Classes', () => {
  
  it('creates a standard Product', () => {
    const product = new Product({
      id: "id1",
      image: "images/products/umbrella.jpg",
      name: "umbrella",
      rating: { stars: 4.5, count: 87 },
      priceCents: 1090
    });

    expect(product.id).toEqual('id1');
    expect(product.extraInfoHTML()).toEqual(''); // Should be empty
  });

  // Test 2: Clothing Product
  it('creates a Clothing product', () => {
    const clothing = new Clothing({
      id: "id2",
      image: "images/products/shirt.jpg",
      name: "Shirt",
      rating: { stars: 4.5, count: 87 },
      priceCents: 2000,
      type: "clothing",
      sizeChartLink: "images/size-chart.png"
    });

    // Check if it generates the link correctly
    expect(clothing.extraInfoHTML()).toContain('<a href = "images/size-chart.png"');
    expect(clothing.extraInfoHTML()).toContain('Size chart');
  });

  // Test 3: Appliance Product (The one you just fixed)
  it('creates an Appliance product', () => {
    const appliance = new Appliance({
      id: "id3",
      image: "images/products/toaster.jpg",
      name: "Toaster",
      rating: { stars: 5, count: 10 },
      priceCents: 3000,
      type: "Appliance",
      instructionsLink: "images/instructions.png",
      warrantyLink: "images/warranty.png"
    });
    expect(appliance.extraApplianceInfoHTML()).toContain('<a href = "images/instructions.png"');
    expect(appliance.extraApplianceInfoHTML()).toContain('Instruction');
    
    expect(appliance.extraApplianceInfoHTML()).toContain('<a href = "images/warranty.png"');
    expect(appliance.extraApplianceInfoHTML()).toContain('Warranty');
  });
});