# **ESJ Source Code**

## **Running the Application Locally (Without HTTPS)**

To run the application on your localhost without HTTPS, follow these steps:

1. Open your terminal in the project directory.  
2. Run the following command:
   ```bash
   docker compose up -d
   ```

---

## **Running the Application with HTTPS**

To enable **HTTPS**, follow the steps below.

### **1) Generate Certificates for the Frontend (nginx)**

1. Find your **local IP address** (e.g., `192.168.0.3`).
2. Create an `ssl` folder in the project directory:
   ```bash
   mkdir ssl
   ```
3. Generate SSL certificates for the frontend:
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
   -keyout ssl/private_key.pem -out ssl/certificate.pem \
   -subj "/C=US/ST=California/L=San Francisco/O=MyOrganization/OU=MyDepartment/CN=<YOUR_LOCAL_IP>"
   ```
   Replace `<YOUR_LOCAL_IP>` with your actual IP address.

---

### **2) Update nginx Configuration**

1. In the **nginx** folder, open the `nginx.conf` file.  
2. Replace all instances of `<YOUR_LOCAL_IP>` with your actual local IP address.

---

### **3) Generate a Certificate for the Backend**

1. Create a keystore using the following command:
   ```bash
   keytool -genkeypair -alias myAlias -keyalg RSA -keysize 2048 \
   -storetype PKCS12 -keystore ./esj-backend/src/main/resources/keystore.p12 \
   -validity 3650 -dname "CN=<YOUR_LOCAL_IP>, OU=MyOrg, O=MyCompany, L=MyCity, ST=MyState, C=US"
   ```
   - Replace `<YOUR_LOCAL_IP>` with your actual IP address.
   - Use **123456789** as the password when prompted.

2. Export the certificate as a `.crt` file:
   ```bash
   keytool -export -alias myAlias \
   -keystore ./esj-backend/src/main/resources/keystore.p12 \
   -file backend-cert.crt
   ```

---

### **4) Run the Application with HTTPS**

Use the following command to build and run the application with HTTPS:

```bash
IP_ADDRESS=<YOUR_LOCAL_IP> docker compose -f docker-compose-v2.yml up --build -d
```
Replace `<YOUR_LOCAL_IP>` with your actual IP address.

---

### **5) Allow Access from Other Computers**

If other computers need access to the application:  

1. Export the `backend-cert.crt` file (from Step 3).  
2. Install the `.crt` file as a **trusted certificate** on those computers.