import { tmpdir } from 'os';
import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
import Order from '../../models/Order';
import demoData from './demoData';
import DatabaseSchema from './databaseSchema';
import Customer from '../../models/Customer';
import Merchant from '../../models/Merchant';

type DatabaseState = 'ready' | 'initializing' | 'initialized';

export class DatabaseService {
  private readonly db: Low<DatabaseSchema>;
  private currentState: DatabaseState = 'ready';

  constructor() {
    // Use demo data - in reality, we would establish a connection to a remote DB
    this.db = new Low<DatabaseSchema>(
      new JSONFile(join(tmpdir(), 'test_db.json'))
    );
    this.init();
  }

  async getCustomer(customerId: string): Promise<Customer | undefined> {
    await this.init();
    return this.db.data?.customers?.[customerId];
  }

  async getMerchant(merchantId: string): Promise<Merchant | undefined> {
    await this.init();
    return this.db.data?.merchants?.[merchantId];
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    await this.init();
    return this.db.data?.orders?.[orderId];
  }

  // Debug handler to read all data
  async getData() {
    await this.init();
    await this.db.read();
    return this.db.data;
  }

  // Initialize demo data, if needed
  private async init() {
    if (this.currentState != 'ready') {
      return;
    }
    this.currentState = 'initializing';
    this.db.data = demoData;
    await this.db.write();
    this.currentState = 'initialized';

    console.log('DB Initialized');
  }
}

export const databaseService = new DatabaseService();
