const dns = require('dns').promises;

async function testDNS() {
  console.log('🔍 Test de résolution DNS...\n');

  // Test 1 : DNS standard
  try {
    const google = await dns.resolve4('google.com');
    console.log('✅ Google DNS OK:', google[0]);
  } catch (error) {
    console.log('❌ Google DNS:', error.message);
  }

  // Test 2 : SRV MongoDB
  try {
    const srv = await dns.resolveSrv('_mongodb._tcp.katelyncraft.6vz8k5a.mongodb.net');
    console.log('✅ SRV MongoDB OK:', srv.length, 'serveurs');
    srv.forEach(s => console.log('   -', s.name + ':' + s.port));
  } catch (error) {
    console.log('❌ SRV MongoDB:', error.message);
  }

  // Test 3 : Avec Google DNS (8.8.8.8)
  try {
    const resolver = new dns.Resolver();
    resolver.setServers(['8.8.8.8', '8.8.4.4']);
    const srv = await resolver.resolveSrv('_mongodb._tcp.katelyncraft.6vz8k5a.mongodb.net');
    console.log('\n✅ SRV avec Google DNS OK:', srv.length, 'serveurs');
    srv.forEach(s => console.log('   -', s.name + ':' + s.port));
  } catch (error) {
    console.log('\n❌ SRV avec Google DNS:', error.message);
  }
}

testDNS();
