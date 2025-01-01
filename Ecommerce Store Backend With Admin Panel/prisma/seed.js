import prisma from "../database/db.config.js";

async function main() {
  // Delete existing products and categories (to overwrite)
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  // Create categories
  const headphonesCategory = await prisma.category.create({
    data: {
      name: 'Headphones',
    },
  });

  const wirelessEarbudsCategory = await prisma.category.create({
    data: {
      name: 'Wireless Earbuds',
    },
  });

  const smartWatchesCategory = await prisma.category.create({
    data: {
      name: 'Smart Watches',
    },
  });

  const bluetoothSpeakersCategory = await prisma.category.create({
    data: {
      name: 'Bluetooth Speakers',
    },
  });

  // Create products for Headphones category
  await prisma.product.createMany({
    data: [
      {
        name: 'Over-Ear Headphones',
        description: 'Comfortable over-ear headphones with noise cancellation',
        price: 149,
        categoryId: headphonesCategory.id,
      },
      {
        name: 'In-Ear Headphones',
        description: 'Lightweight in-ear headphones with deep bass',
        price: 59,
        categoryId: headphonesCategory.id,
      },
      {
        name: 'Noise-Cancelling Headphones',
        description: 'Noise-cancelling headphones with Bluetooth connectivity',
        price: 199,
        categoryId: headphonesCategory.id,
      },
      {
        name: 'Gaming Headset',
        description: 'Wireless gaming headset with surround sound',
        price: 129,
        categoryId: headphonesCategory.id,
      },
      {
        name: 'Sport Headphones',
        description: 'Sweat-proof and secure sport headphones for running',
        price: 79,
        categoryId: headphonesCategory.id,
      },
    ],
  });

  // Create products for Wireless Earbuds category
  await prisma.product.createMany({
    data: [
      {
        name: 'True Wireless Earbuds',
        description: 'Premium quality earbuds with touch controls',
        price: 99,
        categoryId: wirelessEarbudsCategory.id,
      },
      {
        name: 'Noise-Cancelling Earbuds',
        description: 'Earbuds with active noise cancellation and deep sound',
        price: 119,
        categoryId: wirelessEarbudsCategory.id,
      },
      {
        name: 'Waterproof Earbuds',
        description: 'IPX7 rated waterproof earbuds for sports and workouts',
        price: 69,
        categoryId: wirelessEarbudsCategory.id,
      },
      {
        name: 'Compact Wireless Earbuds',
        description: 'Small and compact earbuds with great sound quality',
        price: 49,
        categoryId: wirelessEarbudsCategory.id,
      },
      {
        name: 'Wireless Charging Earbuds',
        description: 'Earbuds with wireless charging case and long battery life',
        price: 89,
        categoryId: wirelessEarbudsCategory.id,
      },
    ],
  });

  // Create products for Smart Watches category
  await prisma.product.createMany({
    data: [
      {
        name: 'Smart Watch Series 6',
        description: 'Smartwatch with fitness tracking, heart rate monitor, and GPS',
        price: 249,
        categoryId: smartWatchesCategory.id,
      },
      {
        name: 'Fitness Smart Watch',
        description: 'Waterproof smartwatch with sleep tracking and activity monitoring',
        price: 129,
        categoryId: smartWatchesCategory.id,
      },
      {
        name: 'Smart Watch Pro',
        description: 'Advanced smartwatch with ECG and SpO2 monitoring',
        price: 299,
        categoryId: smartWatchesCategory.id,
      },
      {
        name: 'Kids Smart Watch',
        description: 'Smartwatch for kids with GPS tracking and games',
        price: 89,
        categoryId: smartWatchesCategory.id,
      },
      {
        name: 'Luxury Smart Watch',
        description: 'Premium smartwatch with leather strap and custom features',
        price: 499,
        categoryId: smartWatchesCategory.id,
      },
    ],
  });

  // Create products for Bluetooth Speakers category
  await prisma.product.createMany({
    data: [
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact and portable Bluetooth speaker with 10-hour battery life',
        price: 59,
        categoryId: bluetoothSpeakersCategory.id,
      },
      {
        name: 'Waterproof Bluetooth Speaker',
        description: 'IPX7 waterproof Bluetooth speaker for outdoor use',
        price: 89,
        categoryId: bluetoothSpeakersCategory.id,
      },
      {
        name: 'Smart Bluetooth Speaker',
        description: 'Bluetooth speaker with built-in voice assistant and smart features',
        price: 129,
        categoryId: bluetoothSpeakersCategory.id,
      },
      {
        name: 'Mini Bluetooth Speaker',
        description: 'Ultra-portable mini Bluetooth speaker with rich sound',
        price: 29,
        categoryId: bluetoothSpeakersCategory.id,
      },
      {
        name: 'High-Quality Bluetooth Speaker',
        description: 'High-fidelity sound with a premium design and bass boost',
        price: 149,
        categoryId: bluetoothSpeakersCategory.id,
      },
    ],
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });