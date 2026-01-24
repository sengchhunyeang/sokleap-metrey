import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Sokleap Metrey API Documentation',
        version: '1.0.0',
        description: 'Medical Prescription Management System API',
        contact: {
          name: 'Sokleap Metrey',
          email: 'admin@sokleap.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'Patients', description: 'Patient management endpoints' },
        { name: 'Doctors', description: 'Doctor management endpoints' },
        { name: 'Prescriptions', description: 'Prescription management endpoints' },
        { name: 'Medicines', description: 'Medicine management endpoints' },
        { name: 'Users', description: 'User management endpoints' },
        { name: 'Auth', description: 'Authentication endpoints' },
      ],
      components: {
        schemas: {
          Patient: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Patient ID' },
              nssfId: { type: 'string', description: 'NSSF ID' },
              nationalIdCard: { type: 'string', description: 'National ID Card' },
              nameLatin: { type: 'string', description: 'Name in Latin' },
              khmerName: { type: 'string', description: 'Name in Khmer' },
              name: { type: 'string', description: 'Display name' },
              gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER'] },
              age: { type: 'integer', description: 'Age' },
              phone: { type: 'string', description: 'Phone number' },
              address: { type: 'string', description: 'Address' },
              enterprise: { type: 'string', description: 'Enterprise name' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
          Doctor: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Doctor ID' },
              name: { type: 'string', description: 'Doctor name' },
              specialty: { type: 'string', description: 'Specialty' },
              phone: { type: 'string', description: 'Phone number' },
              isActive: { type: 'boolean', description: 'Active status' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
          Medicine: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Medicine ID' },
              name: { type: 'string', description: 'Medicine name' },
              description: { type: 'string', description: 'Description' },
            },
          },
          Prescription: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Prescription ID' },
              patientId: { type: 'string', description: 'Patient ID' },
              doctorId: { type: 'string', description: 'Doctor ID' },
              diagnosis: { type: 'string', description: 'Diagnosis' },
              appointmentDate: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
              patient: { $ref: '#/components/schemas/Patient' },
              doctor: { $ref: '#/components/schemas/Doctor' },
              medicines: {
                type: 'array',
                items: { $ref: '#/components/schemas/PrescriptionMedicine' },
              },
            },
          },
          PrescriptionMedicine: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              medicineId: { type: 'string' },
              morning: { type: 'string' },
              afternoon: { type: 'string' },
              evening: { type: 'string' },
              night: { type: 'string' },
              quantity: { type: 'string' },
              instructions: { type: 'string' },
              medicine: { $ref: '#/components/schemas/Medicine' },
            },
          },
          User: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'User ID' },
              name: { type: 'string', description: 'User name' },
              email: { type: 'string', format: 'email', description: 'Email' },
              role: { type: 'string', enum: ['ADMIN', 'STAFF'] },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
          Error: {
            type: 'object',
            properties: {
              error: { type: 'string', description: 'Error message' },
            },
          },
          Pagination: {
            type: 'object',
            properties: {
              page: { type: 'integer' },
              limit: { type: 'integer' },
              total: { type: 'integer' },
              totalPages: { type: 'integer' },
            },
          },
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      paths: {
        '/api/patients': {
          get: {
            tags: ['Patients'],
            summary: 'Get all patients',
            description: 'Retrieve a paginated list of patients with optional search',
            parameters: [
              { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
              { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } },
              { name: 'search', in: 'query', schema: { type: 'string' }, description: 'Search by NSSF ID, name, or phone' },
            ],
            responses: {
              200: {
                description: 'List of patients',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        patients: { type: 'array', items: { $ref: '#/components/schemas/Patient' } },
                        pagination: { $ref: '#/components/schemas/Pagination' },
                      },
                    },
                  },
                },
              },
              500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            },
          },
          post: {
            tags: ['Patients'],
            summary: 'Create a new patient',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['name', 'gender', 'age'],
                    properties: {
                      nssfId: { type: 'string' },
                      nationalIdCard: { type: 'string' },
                      nameLatin: { type: 'string' },
                      khmerName: { type: 'string' },
                      name: { type: 'string' },
                      gender: { type: 'string', enum: ['MALE', 'FEMALE', 'OTHER'] },
                      age: { type: 'integer' },
                      phone: { type: 'string' },
                      address: { type: 'string' },
                      enterprise: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: {
              201: { description: 'Patient created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' } } } },
              400: { description: 'Bad request', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
              500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            },
          },
        },
        '/api/patients/{id}': {
          get: {
            tags: ['Patients'],
            summary: 'Get patient by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              200: { description: 'Patient details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' } } } },
              404: { description: 'Patient not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            },
          },
          put: {
            tags: ['Patients'],
            summary: 'Update patient',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: {
              required: true,
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' } } },
            },
            responses: {
              200: { description: 'Patient updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/Patient' } } } },
              500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            },
          },
          delete: {
            tags: ['Patients'],
            summary: 'Delete patient',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              200: { description: 'Patient deleted' },
              500: { description: 'Server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            },
          },
        },
        '/api/patients/search': {
          get: {
            tags: ['Patients'],
            summary: 'Search patients',
            parameters: [
              { name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Search query (min 2 chars)' },
              { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
            ],
            responses: {
              200: { description: 'Search results', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Patient' } } } } },
            },
          },
        },
        '/api/patients/import': {
          post: {
            tags: ['Patients'],
            summary: 'Import patients from Excel/CSV',
            requestBody: {
              required: true,
              content: { 'multipart/form-data': { schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } } },
            },
            responses: {
              200: {
                description: 'Import result',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        imported: { type: 'integer' },
                        skipped: { type: 'integer' },
                        total: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/api/doctors': {
          get: {
            tags: ['Doctors'],
            summary: 'Get all doctors',
            parameters: [{ name: 'active', in: 'query', schema: { type: 'boolean' }, description: 'Filter by active status' }],
            responses: {
              200: { description: 'List of doctors', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Doctor' } } } } },
            },
          },
          post: {
            tags: ['Doctors'],
            summary: 'Create a new doctor',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                      name: { type: 'string' },
                      specialty: { type: 'string' },
                      phone: { type: 'string' },
                      isActive: { type: 'boolean', default: true },
                    },
                  },
                },
              },
            },
            responses: {
              201: { description: 'Doctor created', content: { 'application/json': { schema: { $ref: '#/components/schemas/Doctor' } } } },
            },
          },
        },
        '/api/doctors/{id}': {
          get: {
            tags: ['Doctors'],
            summary: 'Get doctor by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              200: { description: 'Doctor details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Doctor' } } } },
              404: { description: 'Doctor not found' },
            },
          },
          put: {
            tags: ['Doctors'],
            summary: 'Update doctor',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Doctor' } } } },
            responses: { 200: { description: 'Doctor updated' } },
          },
          delete: {
            tags: ['Doctors'],
            summary: 'Delete doctor',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Doctor deleted' } },
          },
        },
        '/api/medicines': {
          get: {
            tags: ['Medicines'],
            summary: 'Get all medicines',
            parameters: [{ name: 'search', in: 'query', schema: { type: 'string' } }],
            responses: {
              200: { description: 'List of medicines', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Medicine' } } } } },
            },
          },
          post: {
            tags: ['Medicines'],
            summary: 'Create a new medicine',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['name'],
                    properties: { name: { type: 'string' }, description: { type: 'string' } },
                  },
                },
              },
            },
            responses: { 201: { description: 'Medicine created' } },
          },
        },
        '/api/medicines/{id}': {
          get: {
            tags: ['Medicines'],
            summary: 'Get medicine by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Medicine details' }, 404: { description: 'Medicine not found' } },
          },
          put: {
            tags: ['Medicines'],
            summary: 'Update medicine',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Medicine updated' } },
          },
          delete: {
            tags: ['Medicines'],
            summary: 'Delete medicine',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Medicine deleted' } },
          },
        },
        '/api/prescriptions': {
          get: {
            tags: ['Prescriptions'],
            summary: 'Get all prescriptions',
            parameters: [
              { name: 'patientId', in: 'query', schema: { type: 'string' } },
              { name: 'doctorId', in: 'query', schema: { type: 'string' } },
              { name: 'search', in: 'query', schema: { type: 'string' } },
            ],
            responses: {
              200: { description: 'List of prescriptions', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Prescription' } } } } },
            },
          },
          post: {
            tags: ['Prescriptions'],
            summary: 'Create a new prescription',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['patientId', 'doctorId', 'diagnosis'],
                    properties: {
                      patientId: { type: 'string' },
                      doctorId: { type: 'string' },
                      diagnosis: { type: 'string' },
                      appointmentDate: { type: 'string', format: 'date-time' },
                      medicines: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            medicineId: { type: 'string' },
                            morning: { type: 'string' },
                            afternoon: { type: 'string' },
                            evening: { type: 'string' },
                            night: { type: 'string' },
                            quantity: { type: 'string' },
                            instructions: { type: 'string' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            responses: { 201: { description: 'Prescription created' } },
          },
        },
        '/api/prescriptions/{id}': {
          get: {
            tags: ['Prescriptions'],
            summary: 'Get prescription by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Prescription details' }, 404: { description: 'Prescription not found' } },
          },
          put: {
            tags: ['Prescriptions'],
            summary: 'Update prescription',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Prescription updated' } },
          },
          delete: {
            tags: ['Prescriptions'],
            summary: 'Delete prescription',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'Prescription deleted' } },
          },
        },
        '/api/users': {
          get: {
            tags: ['Users'],
            summary: 'Get all users',
            responses: {
              200: { description: 'List of users', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } } },
            },
          },
        },
        '/api/users/{id}': {
          get: {
            tags: ['Users'],
            summary: 'Get user by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'User details' }, 404: { description: 'User not found' } },
          },
          put: {
            tags: ['Users'],
            summary: 'Update user',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'User updated' } },
          },
          delete: {
            tags: ['Users'],
            summary: 'Delete user',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: { 200: { description: 'User deleted' } },
          },
        },
        '/api/register': {
          post: {
            tags: ['Auth'],
            summary: 'Register a new user',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['name', 'email', 'password'],
                    properties: {
                      name: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      password: { type: 'string', minLength: 6 },
                      role: { type: 'string', enum: ['ADMIN', 'STAFF'], default: 'STAFF' },
                    },
                  },
                },
              },
            },
            responses: { 201: { description: 'User registered' }, 400: { description: 'Bad request' } },
          },
        },
      },
    },
  });
  return spec;
};
