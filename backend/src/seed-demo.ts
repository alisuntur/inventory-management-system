import { DataSource } from 'typeorm';
import { Customer, CustomerType } from './customers/customer.entity';
import { Product } from './products/product.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Sale, SaleStatus } from './sales/sale.entity';
import { SaleItem } from './sales/sale-item.entity';
import { Purchase, PurchaseStatus } from './purchases/purchase.entity';
import { PurchaseItem } from './purchases/purchase-item.entity';
import { Payment, PaymentType, PaymentMethod } from './finance/payment.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'stitch_db',
    entities: [Customer, Product, Supplier, Sale, SaleItem, Purchase, PurchaseItem, Payment],
    synchronize: true,
});

async function seed() {
    await AppDataSource.initialize();
    console.log('✅ Veritabanına bağlandı');

    // Tabloları temizle (sıra önemli!)
    await AppDataSource.query('TRUNCATE TABLE sale_items CASCADE');
    await AppDataSource.query('TRUNCATE TABLE sales CASCADE');
    await AppDataSource.query('TRUNCATE TABLE purchase_items CASCADE');
    await AppDataSource.query('TRUNCATE TABLE purchases CASCADE');
    await AppDataSource.query('TRUNCATE TABLE supplier_products CASCADE');
    await AppDataSource.query('TRUNCATE TABLE products CASCADE');
    await AppDataSource.query('TRUNCATE TABLE suppliers CASCADE');
    await AppDataSource.query('TRUNCATE TABLE customers CASCADE');
    await AppDataSource.query('TRUNCATE TABLE payments CASCADE');
    console.log('🗑️  Eski veriler temizlendi');

    // ─── TEDARİKÇİLER ────────────────────────────────────────────────────────
    const supplierRepo = AppDataSource.getRepository(Supplier);
    const suppliers: Supplier[] = await supplierRepo.save([
        { name: 'Merinos Ana Fabrika', type: 'Factory', balance: 125000, contactInfo: '0222 123 45 67', address: 'Organize Sanayi Bölgesi, Bursa' },
        { name: 'Padişah Dokuma A.Ş.', type: 'Factory', balance: 78000, contactInfo: '0332 234 56 78', address: 'Karatay OSB, Konya' },
        { name: 'Artemis Halı San.', type: 'Factory', balance: 55000, contactInfo: '0242 345 67 89', address: 'Antalya Serbest Bölge' },
        { name: 'Royal Halı A.Ş.', type: 'Wholesaler', balance: 32000, contactInfo: '0312 456 78 90', address: 'Siteler Mah., Ankara' },
        { name: 'İpek Tekstil Ltd.', type: 'Wholesaler', balance: 18500, contactInfo: '0216 567 89 01', address: 'İkitelli OSB, İstanbul' },
    ]);
    console.log(`✅ ${suppliers.length} tedarikçi eklendi`);

    // ─── ÜRÜNLER ─────────────────────────────────────────────────────────────
    const productRepo = AppDataSource.getRepository(Product);
    const products: Product[] = await productRepo.save([
        // Merinos koleksiyonu
        { name: 'Merinos Valeri - Gri/Mavi', sku: 'MER-VAL-160', brand: 'Merinos', category: 'Salon', size: '160x230', width: 160, height: 230, stock: 24, criticalLevel: 5, price: 4850 },
        { name: 'Merinos Valeri - Krem/Bej', sku: 'MER-VAL-200', brand: 'Merinos', category: 'Salon', size: '200x290', width: 200, height: 290, stock: 15, criticalLevel: 5, price: 7200 },
        { name: 'Merinos Elite - Bordo', sku: 'MER-ELT-120', brand: 'Merinos', category: 'Yatak Odası', size: '120x180', width: 120, height: 180, stock: 30, criticalLevel: 8, price: 2100 },
        { name: 'Merinos Elite - Lacivert', sku: 'MER-ELT-160', brand: 'Merinos', category: 'Yatak Odası', size: '160x230', width: 160, height: 230, stock: 18, criticalLevel: 5, price: 3950 },
        // Padişah koleksiyonu
        { name: 'Sultan Koleksiyonu - Gold', sku: 'PAD-SUL-200', brand: 'Padişah', category: 'Salon', size: '200x290', width: 200, height: 290, stock: 12, criticalLevel: 3, price: 8500 },
        { name: 'Sultan Koleksiyonu - Gümüş', sku: 'PAD-SUL-240', brand: 'Padişah', category: 'Salon', size: '240x340', width: 240, height: 340, stock: 8, criticalLevel: 3, price: 12800 },
        { name: 'Modern Art - 04', sku: 'PAD-MOD-80', brand: 'Padişah', category: 'Koridor', size: '80x150', width: 80, height: 150, stock: 40, criticalLevel: 10, price: 1350 },
        { name: 'Modern Art - 07', sku: 'PAD-MOD-120', brand: 'Padişah', category: 'Salon', size: '120x180', width: 120, height: 180, stock: 22, criticalLevel: 8, price: 2650 },
        // Artemis koleksiyonu
        { name: 'Artemis Pasha - Antrasit', sku: 'ART-PSH-160', brand: 'Artemis', category: 'Salon', size: '160x230', width: 160, height: 230, stock: 9, criticalLevel: 3, price: 5600 },
        { name: 'Artemis Trend - Bej', sku: 'ART-TRD-200', brand: 'Artemis', category: 'Salon', size: '200x290', width: 200, height: 290, stock: 3, criticalLevel: 5, price: 9200 },  // Kritik stok!
        // Royal koleksiyonu
        { name: 'Royal Classic - Kırmızı', sku: 'ROY-CLS-160', brand: 'Royal', category: 'Salon', size: '160x230', width: 160, height: 230, stock: 6, criticalLevel: 4, price: 3800 },
        { name: 'Royal Exclusive - Siyah', sku: 'ROY-EXC-200', brand: 'Royal', category: 'Salon', size: '200x290', width: 200, height: 290, stock: 0, criticalLevel: 5, price: 6700 },  // Tükenmiş!
    ]);
    console.log(`✅ ${products.length} ürün eklendi`);

    // ─── MÜŞTERİLER ──────────────────────────────────────────────────────────
    const customerRepo = AppDataSource.getRepository(Customer);
    const customers: Customer[] = await customerRepo.save([
        // Bireysel müşteriler
        { type: CustomerType.INDIVIDUAL, name: 'Ahmet Yılmaz', phone: '0532 111 22 33', email: 'ahmet.yilmaz@gmail.com', city: 'İstanbul', district: 'Kadıköy', address: 'Moda Cad. No:12 Daire:4', tcIdentityNumber: '12345678901', balance: -2850 },
        { type: CustomerType.INDIVIDUAL, name: 'Fatma Kaya', phone: '0544 222 33 44', email: 'fatmakaya@hotmail.com', city: 'Ankara', district: 'Çankaya', address: 'Kızılay Mah. Atatürk Blv. No:34', tcIdentityNumber: '23456789012', balance: 0 },
        { type: CustomerType.INDIVIDUAL, name: 'Mehmet Demir', phone: '0555 333 44 55', email: 'mdemir@gmail.com', city: 'İzmir', district: 'Konak', address: 'Alsancak Mah. Kıbrıs Şehitleri Cad. No:7', tcIdentityNumber: '34567890123', balance: -4200 },
        { type: CustomerType.INDIVIDUAL, name: 'Ayşe Çelik', phone: '0505 444 55 66', email: 'aysecelik@yahoo.com', city: 'Bursa', district: 'Nilüfer', address: 'Görükle Mah. 1453 Cad. No:5', tcIdentityNumber: '45678901234', balance: -1600 },
        { type: CustomerType.INDIVIDUAL, name: 'Mustafa Şahin', phone: '0533 555 66 77', email: 'msahin@gmail.com', city: 'Antalya', district: 'Muratpaşa', address: 'Lara Cad. No:88', tcIdentityNumber: '56789012345', balance: 500 },
        { type: CustomerType.INDIVIDUAL, name: 'Zeynep Arslan', phone: '0542 666 77 88', email: 'zarslan@hotmail.com', city: 'Gaziantep', district: 'Şahinbey', address: 'Güzelvadi Mah. No:22', tcIdentityNumber: '67890123456', balance: -3100 },
        // Kurumsal müşteriler
        { type: CustomerType.CORPORATE, name: 'Yılmaz Halı A.Ş.', contactPerson: 'Burak Yılmaz', phone: '0322 123 45 67', email: 'info@yilmazhalı.com.tr', city: 'Adana', district: 'Seyhan', address: 'Sanayi Mah. Çakmak Cad. No:45', taxOffice: 'Seyhan VD', taxNumber: '1234567890', balance: -18500 },
        { type: CustomerType.CORPORATE, name: 'Özdemir Mobilya Ltd.', contactPerson: 'Selim Özdemir', phone: '0212 234 56 78', email: 'satis@ozdemirmobilya.com', city: 'İstanbul', district: 'Bağcılar', address: 'Merkez Mah. Atatürk Cad. No:100', taxOffice: 'Bağcılar VD', taxNumber: '2345678901', balance: -7800 },
        { type: CustomerType.CORPORATE, name: 'Karadeniz Yapı Market', contactPerson: 'Ali Temel', phone: '0462 345 67 89', email: 'info@karadenizyapi.com', city: 'Trabzon', district: 'Ortahisar', address: 'Kemerkaya Mah. İskele Cad. No:12', taxOffice: 'Trabzon VD', taxNumber: '3456789012', balance: -12300 },
        { type: CustomerType.CORPORATE, name: 'Ege Dekorasyon San. Tic.', contactPerson: 'Semih Tan', phone: '0232 456 78 90', email: 'semih@egedekor.com.tr', city: 'İzmir', district: 'Bornova', address: 'Kazımdirik Mah. No:55', taxOffice: 'Bornova VD', taxNumber: '4567890123', balance: -5200 },
    ]);
    console.log(`✅ ${customers.length} müşteri eklendi`);

    // ─── SATIŞLAR ─────────────────────────────────────────────────────────────
    const saleRepo = AppDataSource.getRepository(Sale);

    const salesData = [
        {
            customer: customers[0], // Ahmet Yılmaz
            status: SaleStatus.DELIVERED,
            items: [
                { product: products[0], quantity: 1 }, // Merinos Valeri Gri
                { product: products[6], quantity: 2 }, // Modern Art 04
            ]
        },
        {
            customer: customers[6], // Yılmaz Halı A.Ş.
            status: SaleStatus.PENDING,
            items: [
                { product: products[4], quantity: 2 }, // Sultan Gold
                { product: products[7], quantity: 3 }, // Modern Art 07
            ]
        },
        {
            customer: customers[2], // Mehmet Demir
            status: SaleStatus.DELIVERED,
            items: [
                { product: products[1], quantity: 1 }, // Merinos Valeri Krem
            ]
        },
        {
            customer: customers[7], // Özdemir Mobilya
            status: SaleStatus.PREPARING,
            items: [
                { product: products[8], quantity: 1 }, // Artemis Pasha
                { product: products[3], quantity: 2 }, // Merinos Elite Lacivert
            ]
        },
        {
            customer: customers[3], // Ayşe Çelik
            status: SaleStatus.DELIVERED,
            items: [
                { product: products[10], quantity: 2 }, // Royal Classic
            ]
        },
        {
            customer: customers[8], // Karadeniz Yapı
            status: SaleStatus.ON_WAY,
            items: [
                { product: products[5], quantity: 1 }, // Sultan Gümüş
                { product: products[6], quantity: 5 }, // Modern Art 04
            ]
        },
        {
            customer: customers[5], // Zeynep Arslan
            status: SaleStatus.DELIVERED,
            items: [
                { product: products[2], quantity: 2 }, // Merinos Elite Bordo
                { product: products[6], quantity: 1 }, // Modern Art 04
            ]
        },
        {
            customer: customers[9], // Ege Dekorasyon
            status: SaleStatus.PENDING,
            items: [
                { product: products[0], quantity: 3 }, // Merinos Valeri Gri
                { product: products[7], quantity: 2 }, // Modern Art 07
            ]
        },
    ];

    for (const saleData of salesData) {
        const saleItems: SaleItem[] = saleData.items.map(item => {
            const si = new SaleItem();
            si.productId = item.product.id;
            si.productName = item.product.name;
            si.quantity = item.quantity;
            si.unitPrice = Number(item.product.price);
            si.totalPrice = Number(item.product.price) * item.quantity;
            return si;
        });

        const totalAmount = saleItems.reduce((sum, i) => sum + i.totalPrice, 0);

        const sale = saleRepo.create({
            customer: saleData.customer,
            status: saleData.status,
            totalAmount,
            items: saleItems,
        });
        await saleRepo.save(sale);
    }
    console.log(`✅ ${salesData.length} satış eklendi`);

    // ─── SATIN ALMALAR ────────────────────────────────────────────────────────
    const purchaseRepo = AppDataSource.getRepository(Purchase);
    const purchaseItemRepo = AppDataSource.getRepository(PurchaseItem);

    const purchasesData = [
        {
            factoryName: 'Merinos Ana Fabrika',
            status: PurchaseStatus.RECEIVED,
            items: [
                { productId: products[0].id, productSku: products[0].sku, quantity: 30, unitPrice: 3200 },
                { productId: products[1].id, productSku: products[1].sku, quantity: 20, unitPrice: 4800 },
            ]
        },
        {
            factoryName: 'Padişah Dokuma A.Ş.',
            status: PurchaseStatus.SHIPPED,
            items: [
                { productId: products[4].id, productSku: products[4].sku, quantity: 15, unitPrice: 5600 },
                { productId: products[6].id, productSku: products[6].sku, quantity: 50, unitPrice: 850 },
            ]
        },
        {
            factoryName: 'Artemis Halı San.',
            status: PurchaseStatus.PRODUCING,
            items: [
                { productId: products[8].id, productSku: products[8].sku, quantity: 12, unitPrice: 3700 },
                { productId: products[9].id, productSku: products[9].sku, quantity: 10, unitPrice: 6100 },
            ]
        },
        {
            factoryName: 'Royal Halı A.Ş.',
            status: PurchaseStatus.ORDERED,
            items: [
                { productId: products[10].id, productSku: products[10].sku, quantity: 20, unitPrice: 2500 },
                { productId: products[11].id, productSku: products[11].sku, quantity: 15, unitPrice: 4400 },
            ]
        },
        {
            factoryName: 'Merinos Ana Fabrika',
            status: PurchaseStatus.ORDERED,
            items: [
                { productId: products[2].id, productSku: products[2].sku, quantity: 40, unitPrice: 1400 },
                { productId: products[3].id, productSku: products[3].sku, quantity: 25, unitPrice: 2600 },
            ]
        },
    ];

    for (const pData of purchasesData) {
        const pItems = pData.items.map(item => {
            const pi = new PurchaseItem();
            pi.productId = item.productId;
            pi.productSku = item.productSku;
            pi.quantity = item.quantity;
            pi.unitPrice = item.unitPrice;
            pi.totalPrice = item.unitPrice * item.quantity;
            return pi;
        });
        const totalAmount = pItems.reduce((sum, i) => sum + i.totalPrice, 0);
        const purchase = purchaseRepo.create({
            factoryName: pData.factoryName,
            status: pData.status,
            totalAmount,
            items: pItems,
        });
        await purchaseRepo.save(purchase);
    }
    console.log(`✅ ${purchasesData.length} satın alma eklendi`);

    // ─── FİNANS / ÖDEMELER ───────────────────────────────────────────────────
    const paymentRepo = AppDataSource.getRepository(Payment);

    // Müşteri tahsilatları (customer income)
    const paymentData = [
        // Müşterilerden tahsilatlar
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[0].id, partyName: customers[0].name, amount: 4850, method: PaymentMethod.BANK_TRANSFER, description: 'Ahmet Yılmaz - Ocak tahsilatı' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[1].id, partyName: customers[1].name, amount: 7200, method: PaymentMethod.CASH, description: 'Fatma Kaya - Ürün bedeli' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[2].id, partyName: customers[2].name, amount: 3000, method: PaymentMethod.CREDIT_CARD, description: 'Mehmet Demir - Kısmi ödeme' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[6].id, partyName: customers[6].name, amount: 18500, method: PaymentMethod.BANK_TRANSFER, description: 'Yılmaz Halı A.Ş. - Şubat havalesi' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[7].id, partyName: customers[7].name, amount: 7800, method: PaymentMethod.CHECK, description: 'Özdemir Mobilya - Çek tahsili' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[3].id, partyName: customers[3].name, amount: 1600, method: PaymentMethod.CASH, description: 'Ayşe Çelik - Nakit ödeme' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[8].id, partyName: customers[8].name, amount: 12300, method: PaymentMethod.BANK_TRANSFER, description: 'Karadeniz Yapı - Mart ödemesi' },
        { type: PaymentType.INCOME, partyType: 'customer', partyId: customers[5].id, partyName: customers[5].name, amount: 5500, method: PaymentMethod.CREDIT_CARD, description: 'Zeynep Arslan - Kısmi tahsilat' },
        // Tedarikçilere ödemeler
        { type: PaymentType.EXPENSE, partyType: 'supplier', partyId: suppliers[0].id, partyName: suppliers[0].name, amount: 50000, method: PaymentMethod.BANK_TRANSFER, description: 'Merinos - Ocak sipariş avansı' },
        { type: PaymentType.EXPENSE, partyType: 'supplier', partyId: suppliers[1].id, partyName: suppliers[1].name, amount: 30000, method: PaymentMethod.BANK_TRANSFER, description: 'Padişah - Sipariş ödemesi' },
        { type: PaymentType.EXPENSE, partyType: 'supplier', partyId: suppliers[2].id, partyName: suppliers[2].name, amount: 15000, method: PaymentMethod.CHECK, description: 'Artemis - Çek ödemesi' },
        { type: PaymentType.EXPENSE, partyType: 'supplier', partyId: suppliers[0].id, partyName: suppliers[0].name, amount: 75000, method: PaymentMethod.BANK_TRANSFER, description: 'Merinos - Şubat kapanış ödemesi' },
        { type: PaymentType.EXPENSE, partyType: 'supplier', partyId: suppliers[3].id, partyName: suppliers[3].name, amount: 32000, method: PaymentMethod.BANK_TRANSFER, description: 'Royal - Toplu ödeme' },
    ];

    await paymentRepo.save(paymentData.map(p => paymentRepo.create(p)));
    console.log(`✅ ${paymentData.length} ödeme kaydı eklendi`);

    console.log('\n🎉 Demo veriler başarıyla yüklendi!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👥 Müşteriler : ${customers.length} (6 bireysel, 4 kurumsal)`);
    console.log(`📦 Ürünler    : ${products.length}`);
    console.log(`🏭 Tedarikçi  : ${suppliers.length}`);
    console.log(`💰 Satışlar   : ${salesData.length}`);
    console.log(`🛒 Satın Alma : ${purchasesData.length}`);
    console.log(`💳 Ödemeler   : ${paymentData.length} (8 tahsilat + 5 tedarikçi ödemesi)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await AppDataSource.destroy();
}

seed().catch(err => {
    console.error('❌ Hata:', err.message);
    process.exit(1);
});
