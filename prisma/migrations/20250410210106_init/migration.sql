-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "dueDate" DATETIME NOT NULL
);
