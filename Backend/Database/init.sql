-- Create custom ENUMS
CREATE TYPE user_role AS ENUM ('STUDENT', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE app_status AS ENUM ('PENDING', 'REVIEWING', 'APPROVED', 'REJECTED');
CREATE TYPE pay_status AS ENUM ('UNPAID', 'PARTIAL', 'PAID', 'FAILED');
CREATE TYPE pay_currency AS ENUM ('USD', 'KES');
CREATE TYPE pay_method AS ENUM ('MPESA', 'CREDIT_CARD', 'BANK_TRANSFER');

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50),
    role user_role DEFAULT 'STUDENT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) UNIQUE NOT NULL,
    school VARCHAR(100) NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    duration VARCHAR(50) NOT NULL,
    delivery_mode VARCHAR(100) NOT NULL,
    eligibility VARCHAR(255) NOT NULL,
    fee_usd NUMERIC(10, 2) NOT NULL,
    exchange_rate NUMERIC(10, 2) DEFAULT 130.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enrollments Table
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
    application_status app_status DEFAULT 'PENDING',
    payment_status pay_status DEFAULT 'UNPAID',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- Payments Table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
    amount_paid NUMERIC(10, 2) NOT NULL,
    currency pay_currency DEFAULT 'USD',
    method pay_method NOT NULL,
    transaction_ref VARCHAR(100) UNIQUE NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact Inquiries
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optimization Indices for Rapid Dashboard Filtering
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_courses_school ON courses(school);
CREATE INDEX idx_enrollments_status ON enrollments(application_status);
CREATE INDEX idx_payments_ref ON payments(transaction_ref);