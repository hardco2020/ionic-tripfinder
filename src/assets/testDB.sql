CREATE TABLE IF NOT EXISTS AttractionInfo(
    Aid INTEGER PRIMARY KEY AUTOINCREMENT,
    Aname TEXT, 
    GoogleClass TEXT,
    Ohours TEXT,
    Cdate TEXT,
    Phone TEXT,
    Address TEXT,
    Rate TEXT,
    Adescription TEXT,
    Ttospend TEXT
);

INSERT or IGNORE INTO AttractionInfo(Aid, Aname, GoogleClass, Ohours, Cdate, Phone, Address, Rate, Adescription, Ttospend) VALUES (1, '高雄市立歷史博物館', '當地歷史博物館', '09:00–17:00', '星期一', '07 5312612', '803高雄市鹽埕區中正四路272號', '4.2', '這是一個博物館，原高雄市役所', '3');
INSERT or IGNORE INTO AttractionInfo(Aid, Aname, GoogleClass, Ohours, Cdate, Phone, Address, Rate, Adescription, Ttospend) VALUES (2, '西子灣海水浴場', '海水浴場', '07:00–17:00', '無', '無', '804高雄市鼓山區蓮海路70號', '4.3', '沙灘，可以吃沙配海水', '2');
INSERT or IGNORE INTO AttractionInfo(Aid, Aname, GoogleClass, Ohours, Cdate, Phone, Address, Rate, Adescription, Ttospend) VALUES (3, '光榮碼頭', '碼頭', '24h', '無', '無', '802高雄市苓雅區海邊路31號', '4.5', '是高雄亞洲新灣區的地點，很多新建築，風景宜人，景色優美', '2');

