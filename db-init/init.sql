CREATE TABLE votes (
    party_code VARCHAR(10) PRIMARY KEY,
    party_name VARCHAR(100) NOT NULL,
    count INT DEFAULT 0
);

INSERT INTO votes (party_code, party_name) VALUES 
('NPP', 'New Patriotic Party'),
('NDC', 'National Democratic Congress'),
('CPP', 'Convention People''s Party'),
('PNC', 'People''s National Convention'),
('GFP', 'Ghana Freedom Party'),
('IND', 'Independent Candidates');