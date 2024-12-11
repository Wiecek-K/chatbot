'use server';
import { prisma } from '@/lib/prisma';

export async function createWidget() {
  try {
    console.log(await prisma.widget.create({ data: {} }));
  } catch (err) {
    console.error('error executing query:', err);
  } finally {
    prisma.$disconnect();
  }
}

export async function getAllWidgets() {
  try {
    console.log(await prisma.widget.findMany());
  } catch (err) {
    console.error('error executing query:', err);
  } finally {
    prisma.$disconnect();
  }
}
