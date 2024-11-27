interface RoleState {
  id?: number;
  name: string;
  roleKey: string;
  roleSort: number;
  status: string;
  description?: string;
  menuIds?: number[];
  createTime?: string;
  updateTime?: string;
}

export type { RoleState };
