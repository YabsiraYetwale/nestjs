import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getAllNotifications(): Promise<{
        allNotifications: ({
            client: {
                id: string;
                name: string;
                billing_address: string;
                shipping_address: string;
                shipping_city: string;
                shipping_state: string;
                shipping_zip: string;
                shipping_country: string;
                contact_person: string;
                email: string;
                phone: string;
            };
            line_items: {
                id: string;
                description: string;
                quantity: number;
                unit_price: import("@prisma/client/runtime/library").Decimal;
                tax_rate: import("@prisma/client/runtime/library").Decimal;
                invoice_id: string;
            }[];
        } & {
            id: string;
            invoice_number: string;
            date: Date;
            due_date: string;
            total_amount: import("@prisma/client/runtime/library").Decimal;
            status: string;
            isRead: boolean;
            client_id: string;
            creator_id: string;
            company_id: string;
            templateVersion: import(".prisma/client").$Enums.TemplateVersion;
        })[];
    }>;
    MarkNotificationRead(id: string): Promise<any>;
}
