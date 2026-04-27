# 🏠 Halı Sarayı — Premium Halı Bayi Yönetim Sistemi

> **Halı Sarayı**, halı bayileri için geliştirilmiş tam entegre bir yönetim sistemidir.  
> Satış takibi, stok yönetimi, müşteri ve tedarikçi ilişkileri ile finans modüllerini tek bir platformda birleştirir.

---

## 📸 Ekran Görüntüleri

### Giriş Ekranı
![Login](./photos/Project%20(8).png)

### Genel Bakış (Dashboard)
![Dashboard](./photos/Project%20(7).png)

### Satışlar
![Satışlar](./photos/Project%20(6).png)

### Satın Alma (Fabrika Siparişleri)
![Satın Alma](./photos/Project%20(5).png)

### Tedarikçiler
![Tedarikçiler](./photos/Project%20(4).png)

### Stok Takibi
![Stok](./photos/Project%20(3).png)

### Müşteri Listesi
![Müşteriler](./photos/Project%20(2).png)

### Finans
![Finans](./photos/Project%20(1).png)

---

## 🎯 Projenin Amacı

**Halı Sarayı**, halı sektöründeki bayilerin günlük operasyonlarını dijital ortamda yönetmelerine olanak tanır. Temel hedefler:

| Hedef | Açıklama |
|---|---|
| 📦 **Stok Kontrolü** | Ürün girişi ve çıkışlarını gerçek zamanlı takip edin, kritik stok seviyelerinde uyarı alın |
| 💰 **Satış Yönetimi** | Müşterilere yapılan satışları kaydedin, sipariş durumlarını takip edin |
| 🏭 **Tedarik Zinciri** | Fabrikalardan ürün siparişlerini yönetin, teslim süreçlerini izleyin |
| 👥 **Müşteri Portföyü** | Bireysel ve kurumsal müşteri bakiyelerini, sipariş geçmişlerini görüntüleyin |
| 💳 **Finans Takibi** | Tahsilatları ve tedarikçi ödemelerini kayıt altına alın, alacak/borç dengesini görün |
| 📊 **Analitik Panel** | Satış trendleri, marka dağılımı ve en borçlu müşteriler gibi görsel raporlar |

---

## 🛠️ Teknoloji Yığını

### Frontend
| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| React | 18+ | UI kütüphanesi |
| Vite | 5+ | Build ve geliştirme sunucusu |
| TypeScript | 5+ | Tip güvenliği |
| Tailwind CSS | v4 | Stillendirme |
| TanStack Query | 5+ | Sunucu durum yönetimi |
| Recharts | 2+ | Grafik ve görselleştirme |
| Framer Motion | — | Animasyonlar |
| Lucide React | — | İkon seti |
| Axios | — | HTTP istemcisi |

### Backend
| Teknoloji | Versiyon | Açıklama |
|---|---|---|
| NestJS | 10+ | Node.js framework |
| TypeORM | — | ORM (Veritabanı yönetimi) |
| PostgreSQL | 15 | İlişkisel veritabanı |
| Docker | — | Konteyner ortamı |

---

## ✅ Gereksinimler

Projeyi çalıştırmadan önce aşağıdakilerin kurulu olduğundan emin olun:

- [Node.js](https://nodejs.org/) — v18 veya üzeri
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — PostgreSQL için
- npm — Node.js ile birlikte gelir

> ⚠️ Bilgisayarınızda yerel PostgreSQL kuruluysa **5432 portu meşgul** olabilir.  
> Bu projede PostgreSQL Docker üzerinde **5433 portunda** çalışır, çakışma olmaz.

---

## 🚀 Kurulum

### 1. Repoyu klonlayın
```bash
git clone <repo-url>
cd Projem
```

### 2. Bağımlılıkları yükleyin
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

---

## ▶️ Çalıştırma

### Kolay Yol — `start.bat` (Önerilen)

Ana dizindeki `start.bat` dosyasına **çift tıklayın**.

Bu dosya otomatik olarak:
1. Docker'ın çalışıp çalışmadığını kontrol eder
2. PostgreSQL + Redis + PgAdmin konteynerlerini başlatır (`docker-compose up -d`)
3. Backend sunucusunu ayrı bir terminalde başlatır (Port: **3000**)
4. Frontend geliştirme sunucusunu ayrı bir terminalde başlatır (Port: **5173**)

> ⚠️ **Docker Desktop'ın açık ve çalışır durumda olması** gerekir.  
> Sistem tepsisinde balina ikonu **yeşil** olmalıdır.

---

### Manuel Yol

**1. Docker konteynerlerini başlatın** (ana dizinde):
```bash
docker-compose up -d
```

**2. Backend'i başlatın:**
```bash
cd backend
npm run start:dev
```

**3. Frontend'i başlatın** (yeni terminal):
```bash
cd frontend
npm run dev
```

---

## 🌐 Servis Adresleri

| Servis | URL | Açıklama |
|---|---|---|
| 🖥️ **Frontend** | http://localhost:5173 | Kullanıcı arayüzü |
| ⚙️ **Backend API** | http://localhost:3000 | REST API |
| 🐘 **PostgreSQL** | localhost:**5433** | Veritabanı |
| 🗄️ **PgAdmin** | http://localhost:5050 | DB yönetim paneli |

> **PgAdmin Giriş:** `admin@stitch.com` / `admin`

---

## 🗃️ Demo Verilerle Doldurma

Projeyi ilk kez çalıştırdıktan sonra veritabanını demo verilerle doldurabilirsiniz:

```bash
cd backend
npx ts-node -r tsconfig-paths/register src/seed-demo.ts
```

Bu komut şunları ekler:

| Tablo | Adet |
|---|---|
| 👥 Müşteriler | 10 (6 bireysel + 4 kurumsal) |
| 📦 Ürünler | 12 (Merinos, Padişah, Artemis, Royal) |
| 🏭 Tedarikçiler | 5 |
| 💰 Satışlar | 8 (farklı durumlarda) |
| 🛒 Satın Alma | 5 (fabrika siparişleri) |
| 💳 Ödemeler | 13 (8 tahsilat + 5 tedarikçi ödemesi) |

---

## 📁 Proje Yapısı

```
Projem/
├── frontend/               # React + Vite uygulaması
│   └── src/
│       ├── pages/          # Sayfa bileşenleri
│       ├── components/     # Yeniden kullanılabilir bileşenler
│       ├── layouts/        # Sayfa düzenleri
│       └── services/       # API servis katmanı
│
├── backend/                # NestJS uygulaması
│   └── src/
│       ├── customers/      # Müşteri modülü
│       ├── products/       # Ürün/Stok modülü
│       ├── sales/          # Satış modülü
│       ├── purchases/      # Satın alma modülü
│       ├── suppliers/      # Tedarikçi modülü
│       ├── finance/        # Finans modülü
│       └── seed-demo.ts    # Demo veri script'i
│
├── docker-compose.yml      # PostgreSQL + Redis + PgAdmin
├── start.bat               # Tek tıkla başlatma scripti
└── README.md
```

---

## 📋 API Endpoint'leri

| Modül | Endpoint | Metotlar |
|---|---|---|
| Müşteriler | `/customers` | GET, POST, PATCH, DELETE |
| Ürünler | `/products` | GET, POST, PATCH, DELETE |
| Satışlar | `/sales` | GET, POST |
| Satın Alma | `/purchases` | GET, POST, PATCH |
| Tedarikçiler | `/suppliers` | GET, POST, PATCH, DELETE |
| Finans | `/finance` | GET (stats, history), POST (payment) |
| Dashboard | `/dashboard/overview` | GET |

---

## 📝 Notlar

- Veritabanı tabloları backend başladığında **TypeORM `synchronize: true`** sayesinde otomatik oluşturulur.
- Uygulama şu an kimlik doğrulama gerektirmez (JWT entegrasyonu planlanmaktadır).

---

© 2026 Anka. Tüm Hakları Saklıdır.
