import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  { icon: '🌐', order: 1, title: 'Custom Website Development', description: 'Blazing-fast, pixel-perfect websites built to convert visitors into paying customers — tailored to your brand and goals.', features: ['Responsive design', 'SEO foundation', 'CMS integration'] },
  { icon: '📱', order: 2, title: 'Mobile App Development', description: 'Native and cross-platform iOS & Android apps that delight users and drive engagement from Day 1.', features: ['iOS & Android', 'Push notifications', 'Offline support'] },
  { icon: '🛒', order: 3, title: 'E-Commerce Store Creation', description: 'High-converting online stores with smooth checkout, smart inventory, and seamless payment integration built in.', features: ['Payment gateway', 'Inventory', 'Order tracking'] },
  { icon: '✨', order: 4, title: 'Branding & Digital Identity', description: 'Logos, color systems, and brand guidelines that make you instantly recognizable and impossible to forget.', features: ['Logo design', 'Brand guidelines', 'Social kit'] },
  { icon: '🚀', order: 5, title: 'Startup Launch Solutions', description: 'End-to-end launch packages — strategy, design, tech — so you hit the market fast, loud, and ready to win.', features: ['Strategy', 'Design', 'Launch support'] },
];

const plans = [
  { name: 'Micro', price: 4999, period: 'one-time', order: 1, popular: false, description: 'Perfect for individuals', features: ['1-Page Landing Site', 'Mobile Responsive', 'Basic SEO Setup', 'Contact Form', '1 Revision Round'] },
  { name: 'Starter', price: 9999, period: 'one-time', order: 2, popular: false, description: 'For freelancers & small biz', features: ['3-Page Custom Website', 'Mobile Responsive', 'Basic Branding Kit', 'SEO Foundation', 'WhatsApp Integration', '2 Revision Rounds'] },
  { name: 'Growth', price: 24999, period: 'one-time', order: 3, popular: true, description: 'For serious startups', features: ['8-Page Custom Website', 'E-Commerce Ready', 'Full Branding Identity', 'Advanced SEO', 'Social Media Integration', '3-Month Support', '5 Revision Rounds'] },
  { name: 'Pro', price: 49999, period: 'one-time', order: 4, popular: false, description: 'For scaling businesses', features: ['15-Page Custom Website', 'Full E-Commerce Store', 'Complete Brand System', 'Advanced SEO + Blog', 'Performance Dashboard', '6-Month Support', 'Unlimited Revisions'] },
  { name: 'Enterprise', price: 99999, period: 'one-time', order: 5, popular: false, description: 'Full digital empire', features: ['Website + Mobile App', 'E-Commerce + CMS', 'Complete Brand System', 'Performance Marketing', 'Analytics Setup', '12-Month Support', 'Dedicated Manager', 'Priority SLA'] },
];

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.service.deleteMany();
  await prisma.pricingPlan.deleteMany();

  await prisma.service.createMany({ data: services });
  await prisma.pricingPlan.createMany({ data: plans });

  console.log(`✅ Seeded ${services.length} services and ${plans.length} pricing plans.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
