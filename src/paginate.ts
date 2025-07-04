// src/common/utils/paginate.ts
import { SelectQueryBuilder } from "typeorm";

export interface PaginateMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface PaginateResult<T> {
  list: T[];
  meta: PaginateMeta;
}

export function paginateMeta(page: number, limit: number, total: number) {
  const lastPage = Math.ceil(total / limit);
  const prev = page > 1 ? page - 1 : null;
  const next = page < lastPage ? page + 1 : null;
  return {
    total,
    lastPage,
    currentPage: page,
    perPage: limit,
    prev,
    next,
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  orderBy?: [string, "ASC" | "DESC"][]; // 多欄位排序
}

export async function paginate(
  qb: SelectQueryBuilder<any>,
  { page = 1, limit = 10, orderBy }: PaginationOptions,
) {
  page = isNaN(page) ? 1 : Number(page);
  limit = isNaN(limit) ? 10 : Number(limit);

  if (orderBy) {
    for (const [field, order] of orderBy) {
      qb.addOrderBy(field, order);
    }
  }

  const [results, total] = await qb
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  const meta = paginateMeta(page, limit, total);
  return {
    list: results,
    meta,
  };
}
