const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const Sector = require('./src/models/Sector');

const sectorsData = [
  { 
    name: 'Cosmétiques', 
    slug: 'cosmetiques', 
    description: 'Produits de beauté et de soins',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    order: 1,
    active: true
  },
  { 
    name: 'Shopping', 
    slug: 'shopping', 
    description: 'Vêtements, accessoires et plus',
    icon: 'ShoppingBag',
    color: 'from-purple-500 to-indigo-600',
    order: 2,
    active: true
  },
  { 
    name: 'Lingerie', 
    slug: 'lingerie', 
    description: 'Lingerie fine et élégante',
    icon: 'Heart',
    color: 'from-rose-400 to-pink-600',
    order: 3,
    active: true
  },
  { 
    name: 'Bijoux', 
    slug: 'bijoux', 
    description: 'Bijoux précieux et fantaisie',
    icon: 'Gem',
    color: 'from-amber-400 to-yellow-600',
    order: 4,
    active: true
  }
];

async function createSectors() {
  try {
    console.log('📦 Connexion à MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté\n');

    await Sector.deleteMany({});
    console.log('🧹 Anciens secteurs supprimés\n');

    const sectors = await Sector.insertMany(sectorsData);
    console.log(`✅ ${sectors.length} secteurs créés :\n`);
    sectors.forEach(s => console.log(`   - ${s.name} (/${s.slug})`));

    console.log('\n🎉 Terminé !');
    await mongoose.disconnect();

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    await mongoose.disconnect();
  }
}

createSectors();
