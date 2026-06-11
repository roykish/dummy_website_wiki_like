export const store = {
  name: "Downtown POS #1",
  address: "142 Main Street, Downtown",
  manager: "Jennifer Park",
  phone: "+1 (555) 012-3456",
  taxId: "TX-882-4401",
  reportDate: "June 11, 2026",
  shift: "Full Day (09:00 – 21:00)",
  reportGenerated: "June 11, 2026 at 21:05",
};

export const summary = {
  totalRevenue: 8432.50,
  totalTransactions: 247,
  avgTransaction: 34.14,
  totalItemsSold: 892,
  returns: 3,
  returnValue: 87.25,
  netRevenue: 8345.25,
  taxCollected: 759.57,
};

export const paymentMethods = [
  { method: "Credit Card", count: 141, amount: 4847.00, pct: 57.5 },
  { method: "Cash",        count: 62,  amount: 2108.00, pct: 25.0 },
  { method: "Debit Card",  count: 41,  amount: 1390.25, pct: 16.5 },
  { method: "Mobile Pay",  count: 3,   amount:   87.25, pct: 1.0  },
];

export const hourlySales = [
  { hour: "09:00", transactions: 8,  revenue: 142.40  },
  { hour: "10:00", transactions: 22, revenue: 387.20  },
  { hour: "11:00", transactions: 31, revenue: 621.80  },
  { hour: "12:00", transactions: 48, revenue: 1243.60 },
  { hour: "13:00", transactions: 43, revenue: 1087.30 },
  { hour: "14:00", transactions: 29, revenue: 743.10  },
  { hour: "15:00", transactions: 24, revenue: 612.40  },
  { hour: "16:00", transactions: 21, revenue: 534.20  },
  { hour: "17:00", transactions: 26, revenue: 689.50  },
  { hour: "18:00", transactions: 32, revenue: 892.30  },
  { hour: "19:00", transactions: 28, revenue: 748.10  },
  { hour: "20:00", transactions: 27, revenue: 734.30  },
  { hour: "21:00", transactions: 4,  revenue:  88.30  },
];

export const transactions = [
  { id: "T-24701", time: "20:58", cashier: "Bob Martinez",  items: 4, total: 87.60,  payment: "Credit Card", status: "Complete" },
  { id: "T-24700", time: "20:51", cashier: "Alice Chen",    items: 2, total: 24.98,  payment: "Cash",        status: "Complete" },
  { id: "T-24699", time: "20:44", cashier: "Alice Chen",    items: 7, total: 113.45, payment: "Debit Card",  status: "Complete" },
  { id: "T-24698", time: "20:39", cashier: "Carol Johnson", items: 1, total: 8.99,   payment: "Cash",        status: "Complete" },
  { id: "T-24697", time: "20:31", cashier: "David Kim",     items: 5, total: 62.30,  payment: "Credit Card", status: "Complete" },
  { id: "T-24696", time: "20:22", cashier: "Bob Martinez",  items: 3, total: 41.47,  payment: "Mobile Pay",  status: "Complete" },
  { id: "T-24695", time: "20:14", cashier: "Carol Johnson", items: 6, total: 94.12,  payment: "Credit Card", status: "Complete" },
  { id: "T-24694", time: "20:07", cashier: "Emma Wilson",   items: 2, total: 18.99,  payment: "Debit Card",  status: "Complete" },
  { id: "T-24693", time: "19:58", cashier: "Alice Chen",    items: 9, total: 147.82, payment: "Credit Card", status: "Complete" },
  { id: "T-24692", time: "19:49", cashier: "David Kim",     items: 3, total: 38.45,  payment: "Cash",        status: "Complete" },
  { id: "T-24691", time: "19:41", cashier: "Bob Martinez",  items: 4, total: 52.10,  payment: "Credit Card", status: "Complete" },
  { id: "T-24690", time: "19:32", cashier: "Emma Wilson",   items: 2, total: 27.98,  payment: "Cash",        status: "Complete" },
  { id: "T-24689", time: "19:21", cashier: "Carol Johnson", items: 1, total: 18.49,  payment: "Debit Card",  status: "Returned"  },
  { id: "T-24688", time: "19:12", cashier: "Alice Chen",    items: 6, total: 78.34,  payment: "Credit Card", status: "Complete" },
  { id: "T-24687", time: "18:54", cashier: "David Kim",     items: 8, total: 124.60, payment: "Credit Card", status: "Complete" },
  { id: "T-24686", time: "18:43", cashier: "Bob Martinez",  items: 3, total: 43.97,  payment: "Cash",        status: "Complete" },
  { id: "T-24685", time: "18:31", cashier: "Emma Wilson",   items: 5, total: 81.25,  payment: "Credit Card", status: "Complete" },
  { id: "T-24684", time: "18:19", cashier: "Carol Johnson", items: 2, total: 36.98,  payment: "Debit Card",  status: "Complete" },
  { id: "T-24683", time: "18:07", cashier: "Alice Chen",    items: 4, total: 57.40,  payment: "Credit Card", status: "Returned"  },
  { id: "T-24682", time: "17:58", cashier: "David Kim",     items: 3, total: 44.85,  payment: "Cash",        status: "Complete" },
];

export const returns = [
  { id: "R-0089", txId: "T-24689", date: "June 11, 2026", time: "19:21", cashier: "Carol Johnson", item: "Premium Olive Oil 500 ml", sku: "P-0751", qty: 1, total: 18.49, reason: "Wrong item scanned",  refundMethod: "Debit Card",  status: "Completed" },
  { id: "R-0088", txId: "T-24683", date: "June 11, 2026", time: "18:07", cashier: "Alice Chen",    item: "Organic Coffee Beans 1 kg",sku: "P-1042", qty: 2, total: 57.98, reason: "Customer changed mind",refundMethod: "Credit Card", status: "Completed" },
  { id: "R-0087", txId: "T-24521", date: "June 10, 2026", time: "16:43", cashier: "Bob Martinez",  item: "Artisan Sourdough Bread",  sku: "P-0318", qty: 1, total: 8.99,  reason: "Stale product",       refundMethod: "Cash",        status: "Completed" },
  { id: "R-0086", txId: "T-24498", date: "June 10, 2026", time: "11:22", cashier: "David Kim",     item: "Greek Yogurt Plain 1 kg",  sku: "P-0573", qty: 1, total: 9.49,  reason: "Damaged packaging",   refundMethod: "Debit Card",  status: "Completed" },
  { id: "R-0085", txId: "T-24401", date: "June 9, 2026",  time: "14:15", cashier: "Carol Johnson", item: "Almond Butter 500 g",      sku: "P-0831", qty: 1, total: 14.99, reason: "Wrong item scanned",  refundMethod: "Credit Card", status: "Completed" },
  { id: "R-0084", txId: "T-24388", date: "June 9, 2026",  time: "10:51", cashier: "Alice Chen",    item: "Free-Range Eggs (12-pack)",sku: "P-0215", qty: 2, total: 12.98, reason: "Broken product",      refundMethod: "Cash",        status: "Completed" },
  { id: "R-0083", txId: "T-24301", date: "June 8, 2026",  time: "17:34", cashier: "Bob Martinez",  item: "Dark Chocolate 85% (100g)",sku: "P-1205", qty: 3, total: 13.47, reason: "Customer changed mind",refundMethod: "Credit Card", status: "Completed" },
  { id: "R-0082", txId: "T-24287", date: "June 8, 2026",  time: "13:20", cashier: "Emma Wilson",   item: "Whole Milk 2 L",           sku: "P-0122", qty: 1, total: 4.29,  reason: "Expired product",     refundMethod: "Cash",        status: "Pending"   },
  { id: "R-0081", txId: "T-24199", date: "June 7, 2026",  time: "15:47", cashier: "David Kim",     item: "Premium Olive Oil 500 ml", sku: "P-0751", qty: 1, total: 18.49, reason: "Wrong item scanned",  refundMethod: "Debit Card",  status: "Completed" },
  { id: "R-0080", txId: "T-24102", date: "June 6, 2026",  time: "11:09", cashier: "Alice Chen",    item: "Sparkling Water 12-pack",  sku: "P-0934", qty: 1, total: 12.99, reason: "Customer changed mind",refundMethod: "Credit Card", status: "Completed" },
  { id: "R-0079", txId: "T-24088", date: "June 6, 2026",  time: "09:33", cashier: "Carol Johnson", item: "Coconut Oil 500 ml",        sku: "P-0788", qty: 1, total: 12.49, reason: "Damaged item",        refundMethod: "Cash",        status: "Completed" },
  { id: "R-0078", txId: "T-23991", date: "June 5, 2026",  time: "18:55", cashier: "Bob Martinez",  item: "Greek Yogurt Plain 1 kg",  sku: "P-0573", qty: 2, total: 18.98, reason: "Expired product",     refundMethod: "Debit Card",  status: "Completed" },
];

export const allProducts = [
  { rank: 1,  sku: "P-1042", name: "Organic Coffee Beans 1 kg",  category: "Beverages",  unitPrice: 28.99, cost: 16.80, sold: 87,  revenue: 2522.13, stock: 24 },
  { rank: 2,  sku: "P-0318", name: "Artisan Sourdough Bread",     category: "Bakery",     unitPrice: 8.99,  cost: 4.20,  sold: 132, revenue: 1186.68, stock: 8  },
  { rank: 3,  sku: "P-0751", name: "Premium Olive Oil 500 ml",    category: "Condiments", unitPrice: 18.49, cost: 10.90, sold: 64,  revenue: 1183.36, stock: 31 },
  { rank: 4,  sku: "P-0215", name: "Free-Range Eggs (12-pack)",   category: "Dairy",      unitPrice: 6.49,  cost: 3.80,  sold: 141, revenue: 915.09,  stock: 42 },
  { rank: 5,  sku: "P-0934", name: "Sparkling Water 12-pack",     category: "Beverages",  unitPrice: 12.99, cost: 7.20,  sold: 68,  revenue: 883.32,  stock: 57 },
  { rank: 6,  sku: "P-0122", name: "Whole Milk 2 L",              category: "Dairy",      unitPrice: 4.29,  cost: 2.50,  sold: 193, revenue: 827.97,  stock: 68 },
  { rank: 7,  sku: "P-0467", name: "Grass-Fed Butter 250 g",      category: "Dairy",      unitPrice: 7.99,  cost: 4.60,  sold: 98,  revenue: 783.02,  stock: 34 },
  { rank: 8,  sku: "P-1205", name: "Dark Chocolate 85% (100 g)",  category: "Snacks",     unitPrice: 4.49,  cost: 2.40,  sold: 162, revenue: 727.38,  stock: 76 },
  { rank: 9,  sku: "P-0831", name: "Almond Butter 500 g",         category: "Spreads",    unitPrice: 14.99, cost: 8.70,  sold: 47,  revenue: 704.53,  stock: 19 },
  { rank: 10, sku: "P-0573", name: "Greek Yogurt Plain 1 kg",     category: "Dairy",      unitPrice: 9.49,  cost: 5.50,  sold: 73,  revenue: 692.77,  stock: 28 },
  { rank: 11, sku: "P-0273", name: "Cheddar Cheese 400 g",        category: "Dairy",      unitPrice: 9.99,  cost: 5.80,  sold: 41,  revenue: 409.59,  stock: 27 },
  { rank: 12, sku: "P-0788", name: "Coconut Oil 500 ml",          category: "Condiments", unitPrice: 12.49, cost: 7.10,  sold: 28,  revenue: 349.72,  stock: 23 },
  { rank: 13, sku: "P-0341", name: "Oat Milk 1 L",                category: "Dairy Alt.", unitPrice: 3.99,  cost: 2.20,  sold: 87,  revenue: 347.13,  stock: 41 },
  { rank: 14, sku: "P-0663", name: "Tomato Sauce 500 ml",         category: "Pantry",     unitPrice: 4.29,  cost: 2.30,  sold: 56,  revenue: 240.24,  stock: 48 },
  { rank: 15, sku: "P-0514", name: "Frozen Blueberries 500 g",    category: "Frozen",     unitPrice: 6.99,  cost: 4.00,  sold: 31,  revenue: 216.69,  stock: 18 },
  { rank: 16, sku: "P-0897", name: "Chia Seeds 250 g",            category: "Health",     unitPrice: 8.99,  cost: 4.80,  sold: 22,  revenue: 197.78,  stock: 29 },
  { rank: 17, sku: "P-0632", name: "Sea Salt Crackers 200 g",     category: "Snacks",     unitPrice: 3.49,  cost: 1.80,  sold: 45,  revenue: 157.05,  stock: 52 },
  { rank: 18, sku: "P-0152", name: "Brown Rice 2 kg",             category: "Grains",     unitPrice: 7.49,  cost: 4.10,  sold: 19,  revenue: 142.31,  stock: 35 },
  { rank: 19, sku: "P-0445", name: "Sparkling Lemonade 330 ml",   category: "Beverages",  unitPrice: 2.49,  cost: 1.20,  sold: 34,  revenue: 84.66,   stock: 11 },
  { rank: 20, sku: "P-0910", name: "Gluten-Free Pasta 500 g",     category: "Pantry",     unitPrice: 5.99,  cost: 3.20,  sold: 12,  revenue: 71.88,   stock: 4  },
];

export const staff = [
  { id: "S-01", name: "Alice Chen",    role: "Senior Cashier", shift: "09:00–17:00", transactions: 67, revenue: 2341.20, avgTx: 34.94, returns: 1 },
  { id: "S-02", name: "Bob Martinez",  role: "Cashier",        shift: "10:00–18:00", transactions: 52, revenue: 1876.40, avgTx: 36.08, returns: 0 },
  { id: "S-03", name: "Carol Johnson", role: "Cashier",        shift: "12:00–21:00", transactions: 48, revenue: 1654.30, avgTx: 34.46, returns: 1 },
  { id: "S-04", name: "David Kim",     role: "Cashier",        shift: "13:00–21:00", transactions: 43, revenue: 1481.70, avgTx: 34.46, returns: 1 },
  { id: "S-05", name: "Emma Wilson",   role: "Part-Time",      shift: "16:00–21:00", transactions: 37, revenue: 1078.90, avgTx: 29.16, returns: 0 },
];

export const weeklySchedule = [
  { id:"S-01", name:"Alice Chen",    role:"Senior Cashier", mon:"09:00–17:00", tue:"09:00–17:00", wed:"09:00–17:00", thu:"09:00–17:00", fri:"09:00–17:00", sat:"Off",         sun:"Off"          },
  { id:"S-02", name:"Bob Martinez",  role:"Cashier",        mon:"10:00–18:00", tue:"10:00–18:00", wed:"Off",         thu:"10:00–18:00", fri:"10:00–18:00", sat:"10:00–18:00", sun:"Off"          },
  { id:"S-03", name:"Carol Johnson", role:"Cashier",        mon:"12:00–21:00", tue:"Off",         wed:"12:00–21:00", thu:"12:00–21:00", fri:"12:00–21:00", sat:"12:00–21:00", sun:"Off"          },
  { id:"S-04", name:"David Kim",     role:"Cashier",        mon:"Off",         tue:"13:00–21:00", wed:"13:00–21:00", thu:"Off",         fri:"13:00–21:00", sat:"13:00–21:00", sun:"13:00–21:00"  },
  { id:"S-05", name:"Emma Wilson",   role:"Part-Time",      mon:"16:00–21:00", tue:"16:00–21:00", wed:"Off",         thu:"16:00–21:00", fri:"16:00–21:00", sat:"Off",         sun:"16:00–21:00"  },
  { id:"S-06", name:"Ryan Torres",   role:"Part-Time",      mon:"Off",         tue:"Off",         wed:"10:00–18:00", thu:"Off",         fri:"10:00–18:00", sat:"10:00–18:00", sun:"10:00–18:00"  },
];

export const attendanceRecords = [
  { id:"S-01", name:"Alice Chen",    date:"June 11, 2026", scheduled:"09:00–17:00", clockIn:"08:54", clockOut:"17:08", hours:8.2,  status:"On Time" },
  { id:"S-02", name:"Bob Martinez",  date:"June 11, 2026", scheduled:"10:00–18:00", clockIn:"10:03", clockOut:"18:02", hours:7.98, status:"On Time" },
  { id:"S-03", name:"Carol Johnson", date:"June 11, 2026", scheduled:"12:00–21:00", clockIn:"12:11", clockOut:"21:05", hours:8.9,  status:"Late"    },
  { id:"S-04", name:"David Kim",     date:"June 11, 2026", scheduled:"13:00–21:00", clockIn:"12:58", clockOut:"21:01", hours:8.05, status:"On Time" },
  { id:"S-05", name:"Emma Wilson",   date:"June 11, 2026", scheduled:"16:00–21:00", clockIn:"15:56", clockOut:"21:03", hours:5.1,  status:"On Time" },
  { id:"S-01", name:"Alice Chen",    date:"June 10, 2026", scheduled:"09:00–17:00", clockIn:"09:01", clockOut:"17:00", hours:7.98, status:"On Time" },
  { id:"S-02", name:"Bob Martinez",  date:"June 10, 2026", scheduled:"10:00–18:00", clockIn:"10:00", clockOut:"18:05", hours:8.1,  status:"On Time" },
  { id:"S-03", name:"Carol Johnson", date:"June 10, 2026", scheduled:"12:00–21:00", clockIn:"12:02", clockOut:"21:00", hours:8.97, status:"On Time" },
  { id:"S-04", name:"David Kim",     date:"June 10, 2026", scheduled:"Off",         clockIn:"–",     clockOut:"–",     hours:0,    status:"Day Off" },
  { id:"S-05", name:"Emma Wilson",   date:"June 10, 2026", scheduled:"16:00–21:00", clockIn:"16:22", clockOut:"21:00", hours:4.6,  status:"Late"    },
  { id:"S-01", name:"Alice Chen",    date:"June 9, 2026",  scheduled:"09:00–17:00", clockIn:"08:58", clockOut:"17:04", hours:8.1,  status:"On Time" },
  { id:"S-02", name:"Bob Martinez",  date:"June 9, 2026",  scheduled:"10:00–18:00", clockIn:"10:00", clockOut:"18:00", hours:8.0,  status:"On Time" },
  { id:"S-03", name:"Carol Johnson", date:"June 9, 2026",  scheduled:"Off",         clockIn:"–",     clockOut:"–",     hours:0,    status:"Day Off" },
  { id:"S-04", name:"David Kim",     date:"June 9, 2026",  scheduled:"13:00–21:00", clockIn:"13:05", clockOut:"21:00", hours:7.92, status:"On Time" },
  { id:"S-05", name:"Emma Wilson",   date:"June 9, 2026",  scheduled:"16:00–21:00", clockIn:"16:00", clockOut:"21:02", hours:5.0,  status:"On Time" },
];

export const purchaseOrders = [
  { id:"PO-0112", date:"June 11, 2026", supplier:"NatureFoods",  items:3, total:287.50, status:"Pending",    expected:"June 13, 2026" },
  { id:"PO-0111", date:"June 10, 2026", supplier:"BevCo",        items:5, total:512.00, status:"In Transit", expected:"June 12, 2026" },
  { id:"PO-0110", date:"June 9, 2026",  supplier:"DairyFirst",   items:4, total:348.00, status:"Received",   expected:"June 11, 2026" },
  { id:"PO-0109", date:"June 8, 2026",  supplier:"Local Bakery", items:2, total:96.00,  status:"Received",   expected:"June 10, 2026" },
  { id:"PO-0108", date:"June 7, 2026",  supplier:"BeanOrigin",   items:2, total:435.00, status:"Received",   expected:"June 9, 2026"  },
  { id:"PO-0107", date:"June 5, 2026",  supplier:"ChocoCraft",   items:3, total:215.40, status:"Received",   expected:"June 7, 2026"  },
  { id:"PO-0106", date:"June 3, 2026",  supplier:"FrostFarms",   items:4, total:198.00, status:"Received",   expected:"June 5, 2026"  },
  { id:"PO-0105", date:"June 1, 2026",  supplier:"HappyHen",     items:6, total:324.00, status:"Received",   expected:"June 3, 2026"  },
  { id:"PO-0104", date:"May 30, 2026",  supplier:"MedSelect",    items:2, total:184.90, status:"Received",   expected:"June 1, 2026"  },
  { id:"PO-0103", date:"May 28, 2026",  supplier:"GrainGood",    items:3, total:267.30, status:"Received",   expected:"May 30, 2026"  },
  { id:"PO-0102", date:"May 25, 2026",  supplier:"TropicGoods",  items:2, total:149.80, status:"Received",   expected:"May 27, 2026"  },
  { id:"PO-0101", date:"May 23, 2026",  supplier:"NatureFoods",  items:4, total:312.00, status:"Received",   expected:"May 25, 2026"  },
];

export const suppliers = [
  { id:"SUP-01", name:"NatureFoods",  contact:"Mark Ellis",   phone:"+1 555 234 5678", email:"orders@naturefoods.com",  categories:"Health, Spreads",   terms:"Net 30", status:"Active"   },
  { id:"SUP-02", name:"BevCo",        contact:"Sara Liu",     phone:"+1 555 345 6789", email:"orders@bevco.com",        categories:"Beverages",         terms:"Net 15", status:"Active"   },
  { id:"SUP-03", name:"DairyFirst",   contact:"Tom Bridges",  phone:"+1 555 456 7890", email:"orders@dairyfirst.com",   categories:"Dairy",             terms:"Net 7",  status:"Active"   },
  { id:"SUP-04", name:"Local Bakery", contact:"Anna Stein",   phone:"+1 555 567 8901", email:"info@localbakery.com",    categories:"Bakery",            terms:"COD",    status:"Active"   },
  { id:"SUP-05", name:"BeanOrigin",   contact:"Carlos Reyes", phone:"+1 555 678 9012", email:"supply@beanorigin.com",   categories:"Beverages",         terms:"Net 30", status:"Active"   },
  { id:"SUP-06", name:"ChocoCraft",   contact:"Lena Morgan",  phone:"+1 555 789 0123", email:"orders@chococraft.com",   categories:"Snacks",            terms:"Net 30", status:"Active"   },
  { id:"SUP-07", name:"FrostFarms",   contact:"Jake Winters", phone:"+1 555 890 1234", email:"supply@frostfarms.com",   categories:"Frozen",            terms:"Net 14", status:"Active"   },
  { id:"SUP-08", name:"HappyHen",     contact:"Nina Patel",   phone:"+1 555 901 2345", email:"orders@happyhen.com",     categories:"Dairy",             terms:"Net 7",  status:"Active"   },
  { id:"SUP-09", name:"MedSelect",    contact:"Raj Kumar",    phone:"+1 555 012 3456", email:"b2b@medselect.com",       categories:"Condiments",        terms:"Net 30", status:"Active"   },
  { id:"SUP-10", name:"GrainGood",    contact:"Eva Strand",   phone:"+1 555 123 4567", email:"orders@graingood.com",    categories:"Grains, Pantry",    terms:"Net 30", status:"Active"   },
  { id:"SUP-11", name:"TropicGoods",  contact:"Mike Santos",  phone:"+1 555 234 5670", email:"orders@tropicgoods.com",  categories:"Condiments",        terms:"Net 21", status:"Inactive" },
];

export const systemUsers = [
  { id:"U-01", name:"Jennifer Park", role:"Store Manager",  email:"j.park@retailos.com",     lastLogin:"June 11, 2026 08:42", status:"Active"   },
  { id:"U-02", name:"Alice Chen",    role:"Senior Cashier", email:"a.chen@retailos.com",     lastLogin:"June 11, 2026 08:55", status:"Active"   },
  { id:"U-03", name:"Bob Martinez",  role:"Cashier",        email:"b.martinez@retailos.com", lastLogin:"June 11, 2026 09:58", status:"Active"   },
  { id:"U-04", name:"Carol Johnson", role:"Cashier",        email:"c.johnson@retailos.com",  lastLogin:"June 11, 2026 11:59", status:"Active"   },
  { id:"U-05", name:"David Kim",     role:"Cashier",        email:"d.kim@retailos.com",      lastLogin:"June 11, 2026 12:56", status:"Active"   },
  { id:"U-06", name:"Emma Wilson",   role:"Part-Time",      email:"e.wilson@retailos.com",   lastLogin:"June 11, 2026 15:57", status:"Active"   },
  { id:"U-07", name:"Ryan Torres",   role:"Part-Time",      email:"r.torres@retailos.com",   lastLogin:"June 8, 2026 09:45",  status:"Inactive" },
  { id:"U-08", name:"Head Office",   role:"Administrator",  email:"admin@retailos.com",      lastLogin:"June 10, 2026 14:22", status:"Active"   },
];

export const monthlyStats = [
  { month:"January 2026",  revenue:62450.80, transactions:1724, avgTx:36.22, returns:18, itemsSold:6842 },
  { month:"February 2026", revenue:54320.40, transactions:1480, avgTx:36.70, returns:12, itemsSold:5921 },
  { month:"March 2026",    revenue:71280.60, transactions:1934, avgTx:36.86, returns:21, itemsSold:7745 },
  { month:"April 2026",    revenue:68940.20, transactions:1876, avgTx:36.75, returns:19, itemsSold:7510 },
  { month:"May 2026",      revenue:75620.90, transactions:2043, avgTx:37.01, returns:24, itemsSold:8187 },
  { month:"June 2026",     revenue:8432.50,  transactions:247,  avgTx:34.14, returns:3,  itemsSold:892,  note:"Month in progress (11 days)" },
];

export const chartOfAccounts = [
  { code: '1010', name: 'Cash & Cash Equivalents',        type: 'Asset',     normalBalance: 'DR', balance: 24150.82 },
  { code: '1020', name: 'Accounts Receivable',            type: 'Asset',     normalBalance: 'DR', balance:     0.00 },
  { code: '1030', name: 'Merchandise Inventory',          type: 'Asset',     normalBalance: 'DR', balance: 12450.60 },
  { code: '1040', name: 'Prepaid Expenses',               type: 'Asset',     normalBalance: 'DR', balance:  2026.67 },
  { code: '1510', name: 'POS Equipment (net)',            type: 'Asset',     normalBalance: 'DR', balance:  6375.00 },
  { code: '2010', name: 'Accounts Payable',               type: 'Liability', normalBalance: 'CR', balance:   799.50 },
  { code: '2020', name: 'Sales Tax Payable',              type: 'Liability', normalBalance: 'CR', balance:   759.57 },
  { code: '2030', name: 'Accrued Wages',                  type: 'Liability', normalBalance: 'CR', balance:  1240.00 },
  { code: '3010', name: "Owner's Capital",                type: 'Equity',    normalBalance: 'CR', balance: 45226.17 },
  { code: '4010', name: 'Sales Revenue',                  type: 'Revenue',   normalBalance: 'CR', balance:  8432.50 },
  { code: '4020', name: 'Sales Returns & Allowances',     type: 'Revenue',   normalBalance: 'DR', balance:    87.25 },
  { code: '5010', name: 'Cost of Goods Sold',             type: 'Expense',   normalBalance: 'DR', balance:  4897.40 },
  { code: '6010', name: 'Wages & Salaries',               type: 'Expense',   normalBalance: 'DR', balance:  2340.00 },
  { code: '6020', name: 'Rent Expense',                   type: 'Expense',   normalBalance: 'DR', balance:  3200.00 },
  { code: '6030', name: 'Utilities Expense',              type: 'Expense',   normalBalance: 'DR', balance:   485.00 },
  { code: '6040', name: 'Supplies & Packaging',           type: 'Expense',   normalBalance: 'DR', balance:   210.00 },
  { code: '6050', name: 'Advertising & Marketing',        type: 'Expense',   normalBalance: 'DR', balance:   150.00 },
  { code: '6060', name: 'Miscellaneous Expenses',         type: 'Expense',   normalBalance: 'DR', balance:    85.00 },
];

export const ledgerEntries = [
  { id: 'JE-0087', date: 'June 11, 2026', description: 'Accrued wages — Jun 8–11',           debitCode: '6010', debitName: 'Wages & Salaries',           creditCode: '2030', creditName: 'Accrued Wages',             amount:  849.00, ref: 'PAYROLL-0611'  },
  { id: 'JE-0086', date: 'June 11, 2026', description: 'Sales returns batch — Jun 8–11',     debitCode: '4020', debitName: 'Sales Returns & Allowances', creditCode: '1010', creditName: 'Cash',                      amount:   64.29, ref: 'POS-BATCH-0611' },
  { id: 'JE-0085', date: 'June 11, 2026', description: 'Sales tax accrual — Jun 8–11',       debitCode: '4010', debitName: 'Sales Revenue',              creditCode: '2020', creditName: 'Sales Tax Payable',         amount:  288.94, ref: 'POS-BATCH-0611' },
  { id: 'JE-0084', date: 'June 11, 2026', description: 'COGS recognition — Jun 8–11',        debitCode: '5010', debitName: 'Cost of Goods Sold',         creditCode: '1030', creditName: 'Merchandise Inventory',     amount: 1864.47, ref: 'POS-BATCH-0611' },
  { id: 'JE-0083', date: 'June 11, 2026', description: 'POS sales batch — Jun 8–11',         debitCode: '1010', debitName: 'Cash',                       creditCode: '4010', creditName: 'Sales Revenue',             amount: 3203.30, ref: 'POS-BATCH-0611' },
  { id: 'JE-0082', date: 'June 10, 2026', description: 'AP payment — PO-0102 TropicGoods',   debitCode: '2010', debitName: 'Accounts Payable',           creditCode: '1010', creditName: 'Cash',                      amount:  149.80, ref: 'PMT-0610-B'    },
  { id: 'JE-0081', date: 'June 10, 2026', description: 'AP payment — PO-0103 GrainGood',     debitCode: '2010', debitName: 'Accounts Payable',           creditCode: '1010', creditName: 'Cash',                      amount:  267.30, ref: 'PMT-0610-A'    },
  { id: 'JE-0080', date: 'June 10, 2026', description: 'Receipt rolls (POS paper)',           debitCode: '6040', debitName: 'Supplies & Packaging',       creditCode: '1010', creditName: 'Cash',                      amount:   65.00, ref: 'REC-0503'      },
  { id: 'JE-0079', date: 'June 9, 2026',  description: 'Sales return — R-0084',               debitCode: '4020', debitName: 'Sales Returns & Allowances', creditCode: '1010', creditName: 'Cash',                      amount:    9.49, ref: 'R-0084'        },
  { id: 'JE-0078', date: 'June 9, 2026',  description: 'Petty cash replenishment',            debitCode: '6060', debitName: 'Miscellaneous Expenses',     creditCode: '1010', creditName: 'Cash',                      amount:   40.00, ref: 'PC-0609'       },
  { id: 'JE-0077', date: 'June 8, 2026',  description: 'Inventory receipt — PO-0108',         debitCode: '1030', debitName: 'Merchandise Inventory',      creditCode: '2010', creditName: 'Accounts Payable',          amount:  435.00, ref: 'PO-0108'       },
  { id: 'JE-0076', date: 'June 8, 2026',  description: 'Sales return — R-0083',               debitCode: '4020', debitName: 'Sales Returns & Allowances', creditCode: '1010', creditName: 'Cash',                      amount:   13.47, ref: 'R-0083'        },
  { id: 'JE-0075', date: 'June 8, 2026',  description: 'Payroll disbursement — Jun 1–7',      debitCode: '6010', debitName: 'Wages & Salaries',           creditCode: '1010', creditName: 'Cash',                      amount: 1491.00, ref: 'PAYROLL-0607'  },
  { id: 'JE-0074', date: 'June 8, 2026',  description: 'Store cleaning supplies',             debitCode: '6060', debitName: 'Miscellaneous Expenses',     creditCode: '1010', creditName: 'Cash',                      amount:   45.00, ref: 'REC-0502'      },
  { id: 'JE-0073', date: 'June 7, 2026',  description: 'Sales tax accrual — Jun 4–7',         debitCode: '4010', debitName: 'Sales Revenue',              creditCode: '2020', creditName: 'Sales Tax Payable',         amount:  268.87, ref: 'POS-BATCH-0607' },
  { id: 'JE-0072', date: 'June 7, 2026',  description: 'COGS recognition — Jun 4–7',          debitCode: '5010', debitName: 'Cost of Goods Sold',         creditCode: '1030', creditName: 'Merchandise Inventory',     amount: 1732.69, ref: 'POS-BATCH-0607' },
  { id: 'JE-0071', date: 'June 7, 2026',  description: 'POS sales batch — Jun 4–7',           debitCode: '1010', debitName: 'Cash',                       creditCode: '4010', creditName: 'Sales Revenue',             amount: 2987.40, ref: 'POS-BATCH-0607' },
  { id: 'JE-0070', date: 'June 6, 2026',  description: 'Inventory receipt — PO-0102',         debitCode: '1030', debitName: 'Merchandise Inventory',      creditCode: '2010', creditName: 'Accounts Payable',          amount:  149.80, ref: 'PO-0102'       },
  { id: 'JE-0069', date: 'June 6, 2026',  description: 'Weekly flyer printing',               debitCode: '6050', debitName: 'Advertising & Marketing',    creditCode: '1010', creditName: 'Cash',                      amount:  150.00, ref: 'INV-M-0601'    },
  { id: 'JE-0068', date: 'June 5, 2026',  description: 'Inventory receipt — PO-0103',         debitCode: '1030', debitName: 'Merchandise Inventory',      creditCode: '2010', creditName: 'Accounts Payable',          amount:  267.30, ref: 'PO-0103'       },
  { id: 'JE-0067', date: 'June 5, 2026',  description: 'Shopping bags & tissue paper',        debitCode: '6040', debitName: 'Supplies & Packaging',       creditCode: '1010', creditName: 'Cash',                      amount:  145.00, ref: 'REC-0501'      },
  { id: 'JE-0066', date: 'June 4, 2026',  description: 'Water & sewage bill — June',           debitCode: '6030', debitName: 'Utilities Expense',          creditCode: '1010', creditName: 'Cash',                      amount:  125.00, ref: 'INV-W-0612'    },
  { id: 'JE-0065', date: 'June 3, 2026',  description: 'Sales tax accrual — Jun 1–3',         debitCode: '4010', debitName: 'Sales Revenue',              creditCode: '2020', creditName: 'Sales Tax Payable',         amount:  201.76, ref: 'POS-BATCH-0603' },
  { id: 'JE-0064', date: 'June 3, 2026',  description: 'COGS recognition — Jun 1–3',          debitCode: '5010', debitName: 'Cost of Goods Sold',         creditCode: '1030', creditName: 'Merchandise Inventory',     amount: 1300.24, ref: 'POS-BATCH-0603' },
  { id: 'JE-0063', date: 'June 3, 2026',  description: 'POS sales batch — Jun 1–3',           debitCode: '1010', debitName: 'Cash',                       creditCode: '4010', creditName: 'Sales Revenue',             amount: 2241.80, ref: 'POS-BATCH-0603' },
  { id: 'JE-0062', date: 'June 2, 2026',  description: 'Internet & phone service — June',     debitCode: '6030', debitName: 'Utilities Expense',          creditCode: '1010', creditName: 'Cash',                      amount:   75.00, ref: 'INV-T-0612'    },
  { id: 'JE-0061', date: 'June 2, 2026',  description: 'Electricity bill — June',             debitCode: '6030', debitName: 'Utilities Expense',          creditCode: '1010', creditName: 'Cash',                      amount:  285.00, ref: 'INV-E-0612'    },
  { id: 'JE-0060', date: 'June 1, 2026',  description: 'Monthly store rent payment — June',   debitCode: '6020', debitName: 'Rent Expense',               creditCode: '1010', creditName: 'Cash',                      amount: 3200.00, ref: 'LEASE-2024-01'  },
];

export const expenses = [
  { id: 'EXP-0041', date: 'June 11, 2026', category: 'Wages',     description: 'Accrued wages — Jun 8–11',      amount:  849.00, status: 'Accrued', account: '6010' },
  { id: 'EXP-0040', date: 'June 10, 2026', category: 'Supplies',  description: 'Receipt rolls (POS paper)',     amount:   65.00, status: 'Paid',    account: '6040' },
  { id: 'EXP-0039', date: 'June 9, 2026',  category: 'Misc',      description: 'Petty cash replenishment',     amount:   40.00, status: 'Paid',    account: '6060' },
  { id: 'EXP-0038', date: 'June 8, 2026',  category: 'Wages',     description: 'Payroll disbursement — Jun 1–7',amount: 1491.00, status: 'Paid',    account: '6010' },
  { id: 'EXP-0037', date: 'June 8, 2026',  category: 'Misc',      description: 'Store cleaning supplies',      amount:   45.00, status: 'Paid',    account: '6060' },
  { id: 'EXP-0036', date: 'June 6, 2026',  category: 'Marketing', description: 'Weekly flyer printing',        amount:  150.00, status: 'Paid',    account: '6050' },
  { id: 'EXP-0035', date: 'June 5, 2026',  category: 'Supplies',  description: 'Shopping bags & tissue paper', amount:  145.00, status: 'Paid',    account: '6040' },
  { id: 'EXP-0034', date: 'June 4, 2026',  category: 'Utilities', description: 'Water & sewage — June',        amount:  125.00, status: 'Paid',    account: '6030' },
  { id: 'EXP-0033', date: 'June 2, 2026',  category: 'Utilities', description: 'Internet & phone — June',      amount:   75.00, status: 'Paid',    account: '6030' },
  { id: 'EXP-0032', date: 'June 2, 2026',  category: 'Utilities', description: 'Electricity bill — June',      amount:  285.00, status: 'Paid',    account: '6030' },
  { id: 'EXP-0031', date: 'June 1, 2026',  category: 'Rent',      description: 'Monthly store rent — June',    amount: 3200.00, status: 'Paid',    account: '6020' },
  { id: 'EXP-0030', date: 'May 31, 2026',  category: 'Wages',     description: 'Payroll disbursement — May (final)',amount:3240.00, status: 'Paid', account: '6010' },
  { id: 'EXP-0029', date: 'May 15, 2026',  category: 'Wages',     description: 'Payroll disbursement — May (mid)',amount:3180.00, status: 'Paid',  account: '6010' },
  { id: 'EXP-0028', date: 'May 12, 2026',  category: 'Marketing', description: 'Google Ads campaign — May',    amount:  320.00, status: 'Paid',    account: '6050' },
  { id: 'EXP-0027', date: 'May 10, 2026',  category: 'Supplies',  description: 'Packaging materials order',    amount:  198.00, status: 'Paid',    account: '6040' },
  { id: 'EXP-0026', date: 'May 5, 2026',   category: 'Utilities', description: 'Water & sewage — May',         amount:  118.00, status: 'Paid',    account: '6030' },
  { id: 'EXP-0025', date: 'May 3, 2026',   category: 'Utilities', description: 'Electricity bill — May',       amount:  310.00, status: 'Paid',    account: '6030' },
  { id: 'EXP-0024', date: 'May 3, 2026',   category: 'Utilities', description: 'Internet & phone — May',       amount:   75.00, status: 'Paid',    account: '6030' },
  { id: 'EXP-0023', date: 'May 1, 2026',   category: 'Rent',      description: 'Monthly store rent — May',     amount: 3200.00, status: 'Paid',    account: '6020' },
];

export const plStatement = {
  period: 'June 1–11, 2026',
  note: 'Month in progress — 11 of 30 days',
  revenue: { grossSales: 8432.50, returns: 87.25, netRevenue: 8345.25 },
  cogs: 4897.40,
  grossProfit: 3447.85,
  grossMarginPct: 41.3,
  opEx: [
    { label: 'Wages & Salaries',        amount: 2340.00 },
    { label: 'Rent',                    amount: 3200.00 },
    { label: 'Utilities',               amount:  485.00 },
    { label: 'Supplies & Packaging',    amount:  210.00 },
    { label: 'Advertising & Marketing', amount:  150.00 },
    { label: 'Miscellaneous',           amount:   85.00 },
  ],
  totalOpEx: 6470.00,
  operatingIncome: -3022.15,
  netIncome: -3022.15,
};

export const balanceSheet = {
  date: 'June 11, 2026',
  assets: {
    current: [
      { name: 'Cash & Cash Equivalents', amount: 24150.82 },
      { name: 'Accounts Receivable',     amount:     0.00 },
      { name: 'Merchandise Inventory',   amount: 12450.60 },
      { name: 'Prepaid Expenses',        amount:  2026.67 },
    ],
    fixed: [
      { name: 'POS Equipment (at cost)',    amount:  8500.00 },
      { name: 'Less: Accum. Depreciation',  amount: -2125.00 },
    ],
  },
  liabilities: {
    current: [
      { name: 'Accounts Payable',  amount:  799.50 },
      { name: 'Sales Tax Payable', amount:  759.57 },
      { name: 'Accrued Wages',     amount: 1240.00 },
    ],
  },
  equity: [
    { name: "Owner's Capital",          amount: 45226.17 },
    { name: 'Net Income / (Loss) MTD',  amount:  -3022.15 },
  ],
};

export const monthlyPL = [
  { month: 'June 2026 (MTD)', netRevenue:  8345.25, cogs:  4897.40, grossProfit:  3447.85, grossPct: 41.3, opEx:  6470.00, netIncome: -3022.15, note: '11 days' },
  { month: 'May 2026',        netRevenue: 75344.90, cogs: 43699.25, grossProfit: 31645.65, grossPct: 42.0, opEx: 19820.00, netIncome: 11825.65 },
  { month: 'April 2026',      netRevenue: 68731.20, cogs: 39864.10, grossProfit: 28867.10, grossPct: 42.0, opEx: 19440.00, netIncome:  9427.10 },
  { month: 'March 2026',      netRevenue: 71028.60, cogs: 41196.59, grossProfit: 29832.01, grossPct: 42.0, opEx: 19080.00, netIncome: 10752.01 },
  { month: 'February 2026',   netRevenue: 54202.44, cogs: 31437.42, grossProfit: 22765.02, grossPct: 42.0, opEx: 18640.00, netIncome:  4125.02 },
  { month: 'January 2026',    netRevenue: 62242.90, cogs: 36100.88, grossProfit: 26142.02, grossPct: 42.0, opEx: 18860.00, netIncome:  7282.02 },
];

export const inventory = [
  { sku:"P-0910", name:"Gluten-Free Pasta 500 g",     stock:4,   reorder:20, unit:"boxes",   supplier:"GrainGood",    status:"critical" },
  { sku:"P-0445", name:"Sparkling Lemonade 330 ml",   stock:11,  reorder:40, unit:"cans",    supplier:"BevCo",        status:"critical" },
  { sku:"P-0318", name:"Artisan Sourdough Bread",     stock:8,   reorder:20, unit:"loaves",  supplier:"Local Bakery", status:"low"      },
  { sku:"P-0831", name:"Almond Butter 500 g",         stock:19,  reorder:25, unit:"jars",    supplier:"NatureFoods",  status:"low"      },
  { sku:"P-1042", name:"Organic Coffee Beans 1 kg",   stock:24,  reorder:30, unit:"bags",    supplier:"BeanOrigin",   status:"low"      },
  { sku:"P-0514", name:"Frozen Blueberries 500 g",    stock:18,  reorder:24, unit:"packs",   supplier:"FrostFarms",   status:"low"      },
  { sku:"P-0273", name:"Cheddar Cheese 400 g",        stock:27,  reorder:25, unit:"packs",   supplier:"DairyFirst",   status:"ok"       },
  { sku:"P-0573", name:"Greek Yogurt Plain 1 kg",     stock:28,  reorder:25, unit:"tubs",    supplier:"DairyFirst",   status:"ok"       },
  { sku:"P-0788", name:"Coconut Oil 500 ml",          stock:23,  reorder:20, unit:"bottles", supplier:"TropicGoods",  status:"ok"       },
  { sku:"P-0751", name:"Premium Olive Oil 500 ml",    stock:31,  reorder:30, unit:"bottles", supplier:"MedSelect",    status:"ok"       },
  { sku:"P-0467", name:"Grass-Fed Butter 250 g",      stock:34,  reorder:25, unit:"packs",   supplier:"DairyFirst",   status:"ok"       },
  { sku:"P-0215", name:"Free-Range Eggs (12-pack)",   stock:42,  reorder:30, unit:"packs",   supplier:"HappyHen",     status:"ok"       },
  { sku:"P-0341", name:"Oat Milk 1 L",                stock:41,  reorder:35, unit:"cartons", supplier:"GrainGood",    status:"ok"       },
  { sku:"P-0934", name:"Sparkling Water 12-pack",     stock:57,  reorder:30, unit:"packs",   supplier:"BevCo",        status:"ok"       },
  { sku:"P-0122", name:"Whole Milk 2 L",              stock:68,  reorder:50, unit:"cartons", supplier:"DairyFirst",   status:"ok"       },
  { sku:"P-1205", name:"Dark Chocolate 85% (100 g)",  stock:76,  reorder:40, unit:"bars",    supplier:"ChocoCraft",   status:"ok"       },
];
