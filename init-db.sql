CREATE DATABASE project_db;

CREATE TABLE Authors
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    job VARCHAR(255) NOT NULL,
    online BOOLEAN NOT NULL,
    date DATE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO Authors(name, email, job, online, date) VALUES ('Anton Nazarov',  'anazarom@gmail.com', 'Manager',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Anastasia Alexandrova',  'nasten@gmail.com', 'Programmer',false , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Mikhail Vladimirovich',  'mih_vlad@mail.ru', 'Team-lead',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Oleg Nazarov',  'oleg@gmail.com', 'Manager',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Vladislav Mickhailov',  'vlados@gmail.com', 'Programmer',false , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Maria Velibekova',  'velibeK_mary.ru', 'Team-lead',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Alexey Shevcov',  'shev@gmail.com', 'Manager',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Veronika Maximova',  'maxima_veron@gmail.com', 'Programmer',false , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Nikolay Nikolayev',  'nikolaz@bk.ru', 'Team-lead',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Steve Jobs',  'secret@apple.com', 'Manager',true , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Bill Gates',  'william_genry_gates@microsoft.com', 'Programmer',false , CURRENT_DATE);
INSERT INTO Authors(name, email, job, online, date) VALUES ('Steve Vozniak',  'voz@macintosh.com', 'Team-lead',true , CURRENT_DATE);

CREATE TABLE Projects
(
    id SERIAL PRIMARY KEY,
    "ownerId" INT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES public.authors(id),
    owner VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    budget NUMERIC NOT NULL,
    completion INT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO Projects("ownerId",owner, company_name, budget, completion) VALUES (1,'Anton Nazarov', 'Microsoft', 172.3, 60);
INSERT INTO Projects("ownerId",owner, company_name, budget, completion) VALUES (2,'Anastasia Alexandrova','Ubisoft', 200.1, 30);
INSERT INTO Projects("ownerId",owner, company_name, budget, completion) VALUES (3,'Mikhail Vladimirovich','Applesoft', 800, 100);