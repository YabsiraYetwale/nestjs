import { PrismaClient } from '@prisma/client';
import { CreatePermissionDto } from 'src/permission/dto/create-permission.dto';

const prisma = new PrismaClient();

async function main() {
  const permissions: CreatePermissionDto[] = [
    // client
    {
      action: 'can_create_client',
      roleId: 'clxdjxrtv0001g901gv8rpv8y',
    },
    
    {
      action: 'can_read_clients',
      roleId: 'clxdjy07t0002g901sidch7cf',
    },
    {
      action: 'can_read_client',
      roleId: 'clxdjy07t0002g901sidch7cf',
    },
    {
      action: 'can_update_client',
      roleId: 'clxdjxrtv0001g901gv8rpv8y',
    },
    {
      action: 'can_delete_client',
      roleId: 'clxdjxrtv0001g901gv8rpv8y',
    },
    // company
    {
        action: 'can_create_company',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_read_companies',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_company',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_update_company',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_delete_company',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
    // invoice  
    {
        action: 'can_create_invoice',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_read_invoices',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_invoice',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_update_invoice',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_delete_invoice',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_update_invoiceStatus',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_email_invoice',
        roleId: null,
      },
      {
        action: 'can_download_invoicePDF',
        roleId: null,
      },
    //  user 
    {
        action: 'can_create_user',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_read_users',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_user',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_update_user',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_delete_user',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
    // permission  
      {
        action: 'can_read_permissions',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_permission',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      
    //  user-permission 
    {
        action: 'can_create_userPermission',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_read_userPermissions',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_userPermission',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_update_userPermission',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_delete_userPermission',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
    //  role 
    {
        action: 'can_create_role',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_read_roles',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_role',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_update_role',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_delete_role',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
    //   user-role
    {
        action: 'can_create_userRole',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_read_userRoles',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_read_userRole',
        roleId: 'clxdjy07t0002g901sidch7cf',
      },
      {
        action: 'can_update_userRole',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
      {
        action: 'can_delete_userRole',
        roleId: 'clxdjxrtv0001g901gv8rpv8y',
      },
    // all  
    {
        action: 'can_access_all',
        roleId: 'clxdjxlc70000g9019mlyueyk',
      },
     
  ]

  for (const permission of permissions) {
    await prisma.permission.create({
      data: permission,
    });
  }

  console.log('Permissions seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });