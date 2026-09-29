require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const Sector = require('../models/Sector');
const Shop = require('../models/Shop');

const MONGODB_URI = process.env.MONGODB_URI;

// 4 secteurs de base
const sectorsData = [
  { 
    name: 'Cosmétiques', 
    slug: 'cosmetiques', 
    description: 'Produits de beauté et de soins',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    order: 1
  },
  { 
    name: 'Shopping', 
    slug: 'shopping', 
    description: 'Vêtements, accessoires et plus',
    icon: 'ShoppingBag',
    color: 'from-purple-500 to-indigo-600',
    order: 2
  },
  { 
    name: 'Lingerie', 
    slug: 'lingerie', 
    description: 'Lingerie fine et élégante',
    icon: 'Heart',
    color: 'from-rose-400 to-pink-600',
    order: 3
  },
  { 
    name: 'Bijoux', 
    slug: 'bijoux', 
    description: 'Bijoux précieux et fantaisie',
    icon: 'Gem',
    color: 'from-amber-400 to-yellow-600',
    order: 4
  }
];

// Boutiques de test (basées sur le schéma)
const shopsData = [
  // Cosmétiques
  { 
    name: 'Beauty Boutique', 
    sectorSlug: 'cosmetiques',
    description: 'Votre destination beauté au Cameroun',
    ownerName: 'Marie Ngo', 
    ownerPhone: '237677000001',
    whatsappNumber: '237677000001',
    address: 'Yaoundé, Cameroun',
    featured: true,
    verified: true
  },
  { 
    name: 'Carimo Boutique', 
    sectorSlug: 'cosmetiques',
    description: 'Cosmétiques naturels et bio',
    ownerName: 'Carine M.', 
    ownerPhone: '237677000002',
    whatsappNumber: '237677000002',
    address: 'Douala, Cameroun'
  },
  { 
    name: 'Mava Boutique', 
    sectorSlug: 'cosmetiques',
    description: 'Soins de la peau et du corps',
    ownerName: 'Marlène A.', 
    ownerPhone: '237677000003',
    whatsappNumber: '237677000003',
    address: 'Yaoundé, Cameroun'
  },
  // Shopping
  { 
    name: 'Shine Shop', 
    sectorSlug: 'shopping',
    description: 'Vêtements tendance et accessoires',
    ownerName: 'Sophie K.', 
    ownerPhone: '237677000004',
    whatsappNumber: '237677000004',
    address: 'Yaoundé, Cameroun',
    featured: true,
    verified: true
  },
  { 
    name: 'Pzoulo Boutique', 
    sectorSlug: 'shopping',
    description: 'Mode africaine moderne',
    ownerName: 'Pierre Z.', 
    ownerPhone: '237677000005',
    whatsappNumber: '237677000005',
    address: 'Douala, Cameroun'
  },
  { 
    name: 'Marven Boutique', 
    sectorSlug: 'shopping',
    description: 'Sacs et accessoires de luxe',
    ownerName: 'Marven T.', 
    ownerPhone: '237677000006',
    whatsappNumber: '237677000006',
    address: 'Yaoundé, Cameroun'
  },
  // Lingerie
  { 
    name: 'Elisa Shop', 
    sectorSlug: 'lingerie',
    description: 'Lingerie fine et élégante',
    ownerName: 'Élisa B.', 
    ownerPhone: '237677000007',
    whatsappNumber: '237677000007',
    address: 'Yaoundé, Cameroun',
    featured: true
  },
  { 
    name: 'Kelly Shop', 
    sectorSlug: 'lingerie',
    description: 'Lingerie de luxe',
    ownerName: 'Kelly M.', 
    ownerPhone: '237677000008',
    whatsappNumber: '237677000008',
    address: 'Douala, Cameroun'
  },
  { 
    name: 'Bella Shop', 
    sectorSlug: 'lingerie',
    description: 'Lingerie confortable',
    ownerName: 'Bella N.', 
    ownerPhone: '237677000009',
    whatsappNumber: '237677000009',
    address: 'Yaoundé, Cameroun'
  },
  // Bijoux
  { 
    name: 'Shine Bijoux', 
    sectorSlug: 'bijoux',
    description: 'Bijoux précieux et fantaisie',
    ownerName: 'Shine S.', 
    ownerPhone: '237677000010',
    whatsappNumber: '237677000010',
    address: 'Yaoundé, Cameroun',
    featured: true,
    verified: true
  },
  { 
    name: 'Fozap Bijoux', 
    sectorSlug: 'bijoux',
    description: 'Bijoux artisanaux camerounais',
    ownerName: 'Fozap M.', 
    ownerPhone: '237677000011',
    whatsappNumber: '237677000011',
    address: 'Douala, Cameroun'
  },
  { 
    name: 'Luxe Bijouterie', 
    sectorSlug: 'bijoux',
    description: 'Bijoux de luxe et montres',
    ownerName: 'Luxe L.', 
    ownerPhone: '237677000012',
    whatsappNumber: '237677000012',
    address: 'Yaoundé, Cameroun'
  }
];

async function seedBoutiques() {
  try {
    console.log('📦 Connexion à MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connecté\n');

    // Supprimer les anciens
    await Sector.deleteMany({});
    await Shop.deleteMany({});
    console.log('🧹 Anciennes données supprimées\n');

    // Créer les secteurs
    console.log('📁 Création des secteurs...');
    const sectors = await Sector.insertMany(sectorsData);
    console.log(`✅ ${sectors.length} secteurs créés\n`);

    // Créer un map slug → _id
    const sectorMap = {};
    sectors.forEach(s => { sectorMap[s.slug] = s._id; });

    // Créer les boutiques
    console.log('🏪 Création des boutiques...');
    const shopsToCreate = shopsData.map(shop => {
      const { sectorSlug, ...rest } = shop;
      return {
        ...rest,
        slug: rest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        sector: sectorMap[sectorSlug],
        status: 'active',
        subscription: {
          plan: 'starter',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      };
    });

    const shops = await Shop.insertMany(shopsToCreate);
    console.log(`✅ ${shops.length} boutiques créées\n`);

    console.log('🎉 Seed boutiques terminé !');
    console.log('📊 Résumé:');
    console.log(`   - ${sectors.length} secteurs`);
    console.log(`   - ${shops.length} boutiques`);
    console.log('\n📁 Secteurs:');
    sectors.forEach(s => console.log(`   - ${s.name}`));
    console.log('\n🏪 Boutiques:');
    shops.forEach(s => console.log(`   - ${s.name} (${s.ownerName})`));

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Déconnecté');
  }
}

seedBoutiques();
