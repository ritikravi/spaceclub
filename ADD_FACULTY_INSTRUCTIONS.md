# Add Faculty Members

You have two options to add the faculty members:

## Option 1: Through Admin Panel (Recommended)

1. Go to https://spaceclub-sigma.vercel.app/admin
2. Login with admin password
3. Click "Core Members" tab
4. Click "Add Member" button
5. Fill in the details for each faculty:

### Dr. Jaisukh Paul
- **Name**: Dr. Jaisukh Paul
- **Role**: Faculty Head
- **Division**: Leadership
- **Year**: Faculty
- **Type**: faculty
- **Order**: 1
- **Email**: (leave empty or add if available)
- **LinkedIn**: (add if available)

### Rohan Kumar
- **Name**: Rohan Kumar
- **Role**: Faculty Coordinator
- **Division**: Leadership
- **Year**: Faculty
- **Type**: faculty
- **Order**: 2
- **Email**: (leave empty or add if available)
- **LinkedIn**: (add if available)

## Option 2: Run Script (From Backend)

If you want to add them programmatically:

```bash
cd backend
node add-faculty.js
```

This will automatically create both faculty members in the database.

---

After adding them, they will appear:
- In the Footer → "Guided By — Faculty" section
- On the About page → "Guided By" section
- In the Admin Panel → Core Members list
