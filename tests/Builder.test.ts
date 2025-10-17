import { describe, expect, it } from "vitest";

import type { Builder } from "@/Builder.js";
import sql from "@/index.js";
import type { Value } from "@/types/Value.js";

function alwaysFalse() {
  return false;
}

describe("class Builder", () => {
  type Test = [builder: Builder, sql: string, args: Value[]];

  const tests: Test[] = [
    [sql.select(), "SELECT TRUE", []],
    [sql.select("*"), "SELECT *", []],
    [sql.select("test."), "SELECT `test`.*", []],
    [sql.select("test.*"), "SELECT `test`.*", []],
    [sql.select("test.test"), "SELECT `test`.`test`", []],
    [sql.select().distinct(), "SELECT DISTINCT TRUE", []],
    [sql.select().distinct(false), "SELECT TRUE", []],
    [sql.select(false), "SELECT TRUE", []],
    [sql.select(undefined), "SELECT TRUE", []],
    [sql.select(false, "test"), "SELECT `test`", []],
    [sql.select("test", false), "SELECT `test`", []],
    [sql.select("test", undefined), "SELECT `test`", []],
    [sql.select("test"), "SELECT `test`", []],
    [sql.select("`test`"), "SELECT `test`", []],
    [sql.select("`test\\`"), "SELECT `test`", []],
    [sql.select("test", "test"), "SELECT `test`, `test`", []],
    [sql.select("test1", "test2"), "SELECT `test1`, `test2`", []],
    [sql.select(sql.value(123)), "SELECT ?1", [123]],
    [
      sql.select().selectAliased("test1", "test2"),
      "SELECT `test1` AS `test2`",
      [],
    ],
    [
      sql
        .select("test0")
        .selectAliased("test1", "test2")
        .selectAliased("test3", "test4")
        .selectAliased(false, "test5"),
      "SELECT `test0`, `test1` AS `test2`, `test3` AS `test4`",
      [],
    ],
    [sql.select().from(false), "SELECT TRUE", []],
    [sql.select().from("test"), "SELECT TRUE FROM `test`", []],
    [sql.select().from("test", "test"), "SELECT TRUE FROM `test`, `test`", []],
    [
      sql
        .select()
        .fromAliased("test1", "test2")
        .fromAliased(sql.value(123), "test2"),
      "SELECT TRUE FROM `test1` AS `test2`, ?1 AS `test2`",
      [123],
    ],
    [sql.select().limit(10), "SELECT TRUE LIMIT 10", []],
    [sql.select().limit(false), "SELECT TRUE", []],
    [sql.select().limit(undefined), "SELECT TRUE", []],
    [sql.select().limit(10, 5), "SELECT TRUE LIMIT 10 OFFSET 5", []],
    [sql.select().limit(false, 5), "SELECT TRUE OFFSET 5", []],
    [sql.select().limit(undefined, 5), "SELECT TRUE OFFSET 5", []],
    [sql.select().limit(10, false), "SELECT TRUE LIMIT 10", []],
    [sql.select().limit(false, undefined), "SELECT TRUE", []],
    [sql.select().limit(undefined, 0), "SELECT TRUE", []],
    [
      sql.select().limit(sql.value(10), sql.value(20)),
      "SELECT TRUE LIMIT ?1 OFFSET ?2",
      [10, 20],
    ],
    [sql.select().offset(0), "SELECT TRUE", []],
    [sql.select().offset(10), "SELECT TRUE OFFSET 10", []],
    [sql.select().offset(false), "SELECT TRUE", []],
    [sql.select().offset(undefined), "SELECT TRUE", []],
    [sql.select().offset(sql.value(10)), "SELECT TRUE OFFSET ?1", [10]],
    [sql.select().offset(10).limit(5), "SELECT TRUE LIMIT 5 OFFSET 10", []],
    [sql.select().where(false), "SELECT TRUE", []],
    [sql.select().where(null), "SELECT TRUE", []],
    [sql.select().where(undefined), "SELECT TRUE", []],
    [sql.select().where(sql.value("")), "SELECT TRUE WHERE ?1", [""]],
    [sql.select().where(sql.value("ABC")), "SELECT TRUE WHERE ?1", ["ABC"]],
    [sql.select().where(sql.value(true)), "SELECT TRUE WHERE ?1", [1]],
    [sql.select().where(sql.value(false)), "SELECT TRUE WHERE ?1", [0]],
    [sql.select().where(sql.value(null)), "SELECT TRUE WHERE ?1", [null]],
    [sql.select().where(sql.value(123)), "SELECT TRUE WHERE ?1", [123]],
    [
      sql.select().where(sql.eq("test1", "test2")),
      "SELECT TRUE WHERE `test1` = `test2`",
      [],
    ],
    [
      sql.select().where(sql.eq("test", sql.value(123))),
      "SELECT TRUE WHERE `test` = ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(
          sql.eq("test1", sql.value(123)),
          sql.eq("test2", sql.value(123)),
        ),
      "SELECT TRUE WHERE `test1` = ?1 AND `test2` = ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(
          sql.eq("test1", sql.value(123)),
          sql.eq("test2", sql.value(456)),
        ),
      "SELECT TRUE WHERE `test1` = ?1 AND `test2` = ?2",
      [123, 456],
    ],
    [
      sql.select().where(sql.neq("test", sql.value(123))),
      "SELECT TRUE WHERE `test` != ?1",
      [123],
    ],
    [
      sql.select().where(sql.gt("test", sql.value(123))),
      "SELECT TRUE WHERE `test` > ?1",
      [123],
    ],
    [
      sql.select().where(sql.gte("test", sql.value(123))),
      "SELECT TRUE WHERE `test` >= ?1",
      [123],
    ],
    [
      sql.select().where(sql.lt("test", sql.value(123))),
      "SELECT TRUE WHERE `test` < ?1",
      [123],
    ],
    [
      sql.select().where(sql.lte("test", sql.value(123))),
      "SELECT TRUE WHERE `test` <= ?1",
      [123],
    ],
    [
      sql.select().where(sql.not(sql.eq("test", sql.value(123)))),
      "SELECT TRUE WHERE NOT `test` = ?1",
      [123],
    ],
    [
      sql.select().where(sql.not(sql.not(sql.eq("test", sql.value(123))))),
      "SELECT TRUE WHERE NOT NOT `test` = ?1",
      [123],
    ],
    [
      sql.select().where(sql.between("test", sql.value(123), sql.value(123))),
      "SELECT TRUE WHERE `test` BETWEEN ?1 AND ?1",
      [123],
    ],
    [
      sql.select().where(sql.between("test", sql.value(123), sql.value(456))),
      "SELECT TRUE WHERE `test` BETWEEN ?1 AND ?2",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(sql.notBetween("test", sql.value(123), sql.value(123))),
      "SELECT TRUE WHERE NOT `test` BETWEEN ?1 AND ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(sql.notBetween("test", sql.value(123), sql.value(456))),
      "SELECT TRUE WHERE NOT `test` BETWEEN ?1 AND ?2",
      [123, 456],
    ],
    [
      sql.select().where(sql.isNull("test")),
      "SELECT TRUE WHERE `test` IS NULL",
      [],
    ],
    [
      sql.select().where(sql.isNotNull("test")),
      "SELECT TRUE WHERE NOT `test` IS NULL",
      [],
    ],
    [sql.select().where(sql.or(false)), "SELECT TRUE", []],
    [sql.select().where(sql.or(false), sql.or(false)), "SELECT TRUE", []],
    [
      sql.select().where(sql.or(sql.eq("test1", sql.value(123)))),
      "SELECT TRUE WHERE `test1` = ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(
          sql.or(
            sql.eq("test1", sql.value(123)),
            false,
            sql.eq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE (`test1` = ?1 OR `test2` = ?2)",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(
          sql.and(
            sql.eq("test1", sql.value(123)),
            false,
            sql.eq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE (`test1` = ?1 AND `test2` = ?2)",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(
          sql.or(sql.eq("test1", sql.value(123))),
          sql.and(sql.eq("test2", sql.value(123))),
        ),
      "SELECT TRUE WHERE `test1` = ?1 AND `test2` = ?1",
      [123],
    ],
    [
      sql
        .select()
        .where(
          sql.and(
            sql.eq("test1", sql.value(123)),
            sql.or(false),
            sql.eq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE (`test1` = ?1 AND `test2` = ?2)",
      [123, 456],
    ],
    [
      sql
        .select()
        .where(
          sql.and(
            sql.eq("test1", sql.value(123)),
            sql.or(sql.isNotNull("test2")),
            sql.neq("test2", sql.value(456)),
          ),
        ),
      "SELECT TRUE WHERE (`test1` = ?1 AND NOT `test2` IS NULL AND `test2` != ?2)",
      [123, 456],
    ],
    [
      sql.select().where(sql.collate("test")),
      "SELECT TRUE WHERE `test` COLLATE BINARY",
      [],
    ],
    [
      sql.select().where(sql.collate("test", "NOCASE")),
      "SELECT TRUE WHERE `test` COLLATE NOCASE",
      [],
    ],
    [sql.select().where(sql.raw("123!")), "SELECT TRUE WHERE 123!", []],
    [
      sql.select().where(sql.jsonValue([1, 2, 3])),
      "SELECT TRUE WHERE ?1",
      ["[1,2,3]"],
    ],
    [
      sql.select().where(sql.jsonValue({ abc: 123 })),
      "SELECT TRUE WHERE ?1",
      ['{"abc":123}'],
    ],
    [sql.select().where(sql.jsonValue(null)), "SELECT TRUE WHERE ?1", ["null"]],
    [
      sql.select().where(sql.jsonValue(null, true)),
      "SELECT TRUE WHERE ?1",
      [null],
    ],
    [
      sql.select().where(sql.jsonStaticValue(null)),
      'SELECT TRUE WHERE "null"',
      [],
    ],
    [
      sql.select().where(sql.jsonStaticValue(null, true)),
      "SELECT TRUE WHERE NULL",
      [],
    ],
    [
      sql.select().where(sql.jsonStaticValue(123.456)),
      'SELECT TRUE WHERE "123.456"',
      [],
    ],
    [
      sql.select().where(sql.jsonStaticValue(true)),
      'SELECT TRUE WHERE "true"',
      [],
    ],
    [
      sql.select().where(sql.jsonStaticValue({ abc: 123 })),
      'SELECT TRUE WHERE "{""abc"":123}"',
      [],
    ],
    [
      sql.select().where(sql.cast("test", "INTEGER")),
      "SELECT TRUE WHERE CAST(`test` AS INTEGER)",
      [],
    ],
    [
      sql.select().where(sql.cast(sql.value("test"), "INTEGER")),
      "SELECT TRUE WHERE CAST(?1 AS INTEGER)",
      ["test"],
    ],
    [
      sql.select().where(sql.call("UNIXEPOCH")),
      "SELECT TRUE WHERE UNIXEPOCH()",
      [],
    ],
    [
      sql.select().where(sql.call("JSON_QUOTE", sql.value("test"))),
      "SELECT TRUE WHERE JSON_QUOTE(?1)",
      ["test"],
    ],
    [
      sql.select().where(sql.call("JSON_QUOTE", sql.value(false))),
      "SELECT TRUE WHERE JSON_QUOTE(?1)",
      [0],
    ],
    [
      sql.select().where(sql.call("JSON_QUOTE", sql.call("UNIXEPOCH"))),
      "SELECT TRUE WHERE JSON_QUOTE(UNIXEPOCH())",
      [],
    ],
    [
      sql
        .select()
        .where(
          sql.call(
            "JSON_INSERT",
            sql.jsonValue({}),
            sql.value("$[#]"),
            sql.value(123),
          ),
        ),
      "SELECT TRUE WHERE JSON_INSERT(?1, ?2, ?3)",
      ["{}", "$[#]", 123],
    ],
    [sql.select().where(sql.customCall("XYZ")), "SELECT TRUE WHERE XYZ()", []],
    [
      sql.select().where(sql.exists(sql.select())),
      "SELECT TRUE WHERE EXISTS ( SELECT TRUE )",
      [],
    ],
    [sql.select().where(sql.staticValue(true)), "SELECT TRUE WHERE TRUE", []],
    [sql.select().where(sql.staticValue(false)), "SELECT TRUE WHERE FALSE", []],
    [sql.select().where(sql.staticValue("")), 'SELECT TRUE WHERE ""', []],
    [sql.select().where(sql.staticValue("123")), 'SELECT TRUE WHERE "123"', []],
    [sql.select().where(sql.staticValue(123)), "SELECT TRUE WHERE 123", []],
    [sql.select().where(sql.staticValue('"')), 'SELECT TRUE WHERE """"', []],
    [
      sql.select().where(sql.staticValue(JSON.stringify({ hello: "world" }))),
      'SELECT TRUE WHERE "{""hello"":""world""}"',
      [],
    ],
    [
      sql.select().where(sql.staticValue(123.456)),
      "SELECT TRUE WHERE 123.456",
      [],
    ],
    [
      sql.select().where(sql.staticValue(98765432123456789n)),
      "SELECT TRUE WHERE 98765432123456789",
      [],
    ],
    [sql.select().where(sql.staticValue(null)), "SELECT TRUE WHERE NULL", []],
    [
      sql
        .select()
        .conditional(false, (builder) => builder.where(sql.value(true))),
      "SELECT TRUE",
      [],
    ],
    [
      sql
        .select()
        .conditional(true, (builder) => builder.where(sql.value(true))),
      "SELECT TRUE WHERE ?1",
      [1],
    ],
    [sql.select().orderBy("id"), "SELECT TRUE ORDER BY `id`", []],
    [sql.select().orderBy("id", "ASC"), "SELECT TRUE ORDER BY `id` ASC", []],
    [sql.select().orderBy("id", "DESC"), "SELECT TRUE ORDER BY `id` DESC", []],
    [
      sql.select().orderBy("id", undefined, "NULLS FIRST"),
      "SELECT TRUE ORDER BY `id` NULLS FIRST",
      [],
    ],
    [
      sql.select().orderBy("id", "DESC", "NULLS LAST"),
      "SELECT TRUE ORDER BY `id` DESC NULLS LAST",
      [],
    ],
    [
      sql.select().orderBy(sql.collate("id", "NOCASE")),
      "SELECT TRUE ORDER BY `id` COLLATE NOCASE",
      [],
    ],
    [
      sql.select().orderBy(sql.staticValue("test")),
      'SELECT TRUE ORDER BY "test"',
      [],
    ],
    [
      sql.select().orderBy(sql.call("IFNULL", "id", "index")),
      "SELECT TRUE ORDER BY IFNULL(`id`, `index`)",
      [],
    ],
    [
      sql
        .select()
        .orderBy("id", undefined, "NULLS FIRST")
        .orderBy("name", "ASC"),
      "SELECT TRUE ORDER BY `id` NULLS FIRST, `name` ASC",
      [],
    ],
    [
      sql
        .select("id", "name")
        .from("users")
        .where(sql.eq("name", sql.collate(sql.value("John"), "NOCASE")))
        .where(alwaysFalse() && sql.value("always ignore"))
        .orderBy("id", "DESC", "NULLS FIRST")
        .orderBy("name", "ASC")
        .limit(sql.staticValue(10), sql.value(20)),
      "SELECT `id`, `name` FROM `users` WHERE `name` = ?1 COLLATE NOCASE ORDER BY `id` DESC NULLS FIRST, `name` ASC LIMIT 10 OFFSET ?2",
      ["John", 20],
    ],
    [sql.update("test"), "UPDATE `test`", []],
    [
      sql.update("test").set("index", "123"),
      "UPDATE `test` SET `index` = `123`",
      [],
    ],
    [
      sql.update("test").set("index", sql.value(123)),
      "UPDATE `test` SET `index` = ?1",
      [123],
    ],
    [
      sql
        .update("test")
        .where(sql.eq("index", sql.value(123)))
        .where(sql.eq("test", sql.value("abc")))
        .limit(5)
        .offset(10),
      "UPDATE `test` WHERE `index` = ?1 AND `test` = ?2 LIMIT 5 OFFSET 10",
      [123, "abc"],
    ],
    [sql.delete("test"), "DELETE FROM `test`", []],
    [
      sql
        .delete("test")
        .where(sql.eq("index", sql.value(123)))
        .where(sql.eq("test", sql.jsonValue(123)))
        .limit(5)
        .offset(10),
      "DELETE FROM `test` WHERE `index` = ?1 AND `test` = ?2 LIMIT 5 OFFSET 10",
      [123, "123"],
    ],
    [
      sql.insert("test", ["id", "name"]),
      "INSERT INTO `test` (`id`, `name`)",
      [],
    ],
    [
      sql.insert("test", ["id", "name"]).values("index", sql.value(123)),
      "INSERT INTO `test` (`id`, `name`) VALUES (`index`, ?1)",
      [123],
    ],
    [
      sql
        .insert("test", ["id", "name"])
        .values("index", sql.value(123))
        .values(sql.eq("id", sql.value(456)), sql.staticValue(null)),
      "INSERT INTO `test` (`id`, `name`) VALUES (`index`, ?1), (`id` = ?2, NULL)",
      [123, 456],
    ],
    [sql.case(), "CASE END", []],
    [sql.case("test"), "CASE `test` END", []],
    [
      sql
        .case("test")
        .when("index", sql.value(123))
        .when(sql.value(456), sql.staticValue(null))
        .else(sql.staticValue("else")),
      'CASE `test` WHEN `index` THEN ?1 WHEN ?2 THEN NULL ELSE "else" END',
      [123, 456],
    ],
    [
      sql
        .select("id")
        .selectAliased(sql.case("test").when("index", sql.value(123)), "test")
        .from("test"),
      "SELECT `id`, CASE `test` WHEN `index` THEN ?1 END AS `test` FROM `test`",
      [123],
    ],
    [
      sql.select(
        sql.op("+", sql.op("-", sql.value(1), sql.value(2)), sql.value(3)),
      ),
      "SELECT ((?1 - ?2) + ?3)",
      [1, 2, 3],
    ],
    [
      sql.select(
        sql.op(
          "*",
          sql.op("/", sql.staticValue(1), sql.staticValue(2)),
          sql.staticValue(3),
        ),
      ),
      "SELECT ((1 / 2) * 3)",
      [],
    ],
    [
      sql.select(sql.op("%", sql.value(1), sql.staticValue(2))),
      "SELECT (?1 % 2)",
      [1],
    ],
    [
      sql.select(sql.op("%", sql.staticValue(1), sql.value(2))),
      "SELECT (1 % ?1)",
      [2],
    ],
    [
      sql.select(sql.op("**", sql.staticValue(1), sql.value(2))),
      "SELECT POW(1, ?1)",
      [2],
    ],
    [
      sql.select(sql.sum(sql.staticValue(1), sql.value(2))),
      "SELECT (1 + ?1)",
      [2],
    ],
    [
      sql.select(sql.sub(sql.staticValue(1), sql.value(2))),
      "SELECT (1 - ?1)",
      [2],
    ],
    [
      sql.select(sql.mul(sql.staticValue(1), sql.value(2))),
      "SELECT (1 * ?1)",
      [2],
    ],
    [
      sql.select(sql.div(sql.staticValue(1), sql.value(2))),
      "SELECT (1 / ?1)",
      [2],
    ],
    [
      sql.select(sql.mod(sql.staticValue(1), sql.value(2))),
      "SELECT (1 % ?1)",
      [2],
    ],
    [
      sql.select(sql.pow(sql.staticValue(1), sql.value(2))),
      "SELECT POW(1, ?1)",
      [2],
    ],
    [
      sql.select(
        sql.value(1),
        sql.value(2),
        sql.value(3),
        sql.value(1),
        sql.value(2),
        sql.value(3),
      ),
      "SELECT ?1, ?2, ?3, ?1, ?2, ?3",
      [1, 2, 3],
    ],
    [sql.conflict(["key"]).doNothing(), "ON CONFLICT (`key`) DO NOTHING", []],
    [
      sql
        .conflict(
          ["key", "test"],
          sql.and(
            sql.eq("key", sql.value(123)),
            sql.eq("index", sql.value(123)),
            sql.eq("test", sql.value(456)),
          ),
        )
        .set("key", sql.value(123))
        .set("index", sql.value(456))
        .set("test", sql.value(789))
        .where(
          sql.eq("key", sql.value(123)),
          sql.eq("index", sql.value(123)),
          sql.eq("test", sql.value(456)),
        ),
      "ON CONFLICT (`key`, `test`) WHERE (`key` = ?1 AND `index` = ?1 AND `test` = ?2) DO UPDATE SET `key` = ?1, `index` = ?2, `test` = ?3 WHERE `key` = ?1 AND `index` = ?1 AND `test` = ?2",
      [123, 456, 789],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).onConflictIgnore(),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT DO NOTHING",
      [123],
    ],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(alwaysFalse() && sql.conflict().doNothing()),
      "INSERT INTO `test` (`id`) VALUES (?1)",
      [123],
    ],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(sql.conflict().doNothing()),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT DO NOTHING",
      [123],
    ],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(sql.conflict(["id"]).doNothing()),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT (`id`) DO NOTHING",
      [123],
    ],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(sql.conflict(["id", "key"]).doNothing()),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT (`id`, `key`) DO NOTHING",
      [123],
    ],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(
          sql.conflict(["id"], sql.eq("id", sql.value(123))).doNothing(),
        ),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT (`id`) WHERE `id` = ?1 DO NOTHING",
      [123],
    ],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(
          sql
            .conflict(["id"])
            .set("id", sql.value(123))
            .set("key", sql.staticValue(456))
            .where(sql.eq("id", sql.value(123)))
            .where(alwaysFalse() && sql.eq("key", sql.staticValue(456))),
        ),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT (`id`) DO UPDATE SET `id` = ?1, `key` = 456 WHERE `id` = ?1",
      [123],
    ],
    [sql.select(sql.excluded("id")), "SELECT `excluded`.`id`", []],
    [
      sql
        .insert("test", ["id"])
        .values(sql.value(123))
        .onConflict(
          sql.conflict(["phone"]).set("phone", sql.excluded("phone")),
        ),
      "INSERT INTO `test` (`id`) VALUES (?1) ON CONFLICT (`phone`) DO UPDATE SET `phone` = `excluded`.`phone`",
      [123],
    ],
    [
      sql
        .insert("test", ["id", "key"])
        .values(sql.value(123), sql.value(456))
        .onConflict(sql.conflict(["id"]).set("id", sql.excluded("id")))
        .onConflict(sql.conflict(["key"]).set("key", sql.excluded("key"))),
      "INSERT INTO `test` (`id`, `key`) VALUES (?1, ?2) ON CONFLICT (`id`) DO UPDATE SET `id` = `excluded`.`id` ON CONFLICT (`key`) DO UPDATE SET `key` = `excluded`.`key`",
      [123, 456],
    ],
    [
      sql.select("category").from("products").groupBy("category"),
      "SELECT `category` FROM `products` GROUP BY `category`",
      [],
    ],
    [
      sql
        .select("category", "brand")
        .from("products")
        .groupBy("category", "brand"),
      "SELECT `category`, `brand` FROM `products` GROUP BY `category`, `brand`",
      [],
    ],
    [
      sql.select("category").from("products").groupBy("category").limit(10),
      "SELECT `category` FROM `products` GROUP BY `category` LIMIT 10",
      [],
    ],
    [
      sql
        .select("category")
        .from("products")
        .groupBy(sql.cast("category", "TEXT")),
      "SELECT `category` FROM `products` GROUP BY CAST(`category` AS TEXT)",
      [],
    ],
    [
      sql
        .select("category")
        .from("products")
        .groupBy(sql.call("UPPER", "category")),
      "SELECT `category` FROM `products` GROUP BY UPPER(`category`)",
      [],
    ],
    [
      sql
        .select("category")
        .from("products")
        .groupBy("category", false, "brand"),
      "SELECT `category` FROM `products` GROUP BY `category`, `brand`",
      [],
    ],
    [sql.select().having(false), "SELECT TRUE", []],
    [sql.select().having(sql.value(123)), "SELECT TRUE HAVING ?1", [123]],
    [
      sql.select().having(sql.eq("test1", "test2")),
      "SELECT TRUE HAVING `test1` = `test2`",
      [],
    ],
    [
      sql.select().having(sql.eq("test", sql.value(123))),
      "SELECT TRUE HAVING `test` = ?1",
      [123],
    ],
    [
      sql
        .select()
        .having(
          sql.eq("test1", sql.value(123)),
          sql.eq("test2", sql.value(123)),
        ),
      "SELECT TRUE HAVING `test1` = ?1 AND `test2` = ?1",
      [123],
    ],
    [
      sql.select(sql.call("COUNT", "*")).from("products"),
      "SELECT COUNT(*) FROM `products`",
      [],
    ],
    [
      sql.select(sql.call("COUNT", "id")).from("products"),
      "SELECT COUNT(`id`) FROM `products`",
      [],
    ],
    [
      sql.select(sql.call("COUNT", sql.value(1))).from("products"),
      "SELECT COUNT(?1) FROM `products`",
      [1],
    ],
    [
      sql
        .select("u.name", "p.title")
        .fromAliased("users", "u")
        .join("posts", "p"),
      "SELECT `u`.`name`, `p`.`title` FROM `users` AS `u` INNER JOIN `posts` AS `p`",
      [],
    ],
    [
      sql
        .select("u.name", "p.title")
        .fromAliased("users", "u")
        .joinLeft("posts", "p"),
      "SELECT `u`.`name`, `p`.`title` FROM `users` AS `u` LEFT JOIN `posts` AS `p`",
      [],
    ],
    [
      sql
        .select("u.name", "p.title")
        .fromAliased("users", "u")
        .joinLeft("posts", "p", sql.eq("p.user_id", "u.id")),
      "SELECT `u`.`name`, `p`.`title` FROM `users` AS `u` LEFT JOIN `posts` AS `p` ON `p`.`user_id` = `u`.`id`",
      [],
    ],
    [
      sql
        .select("u.name", "p.title")
        .fromAliased("users", "u")
        .join(
          "posts",
          "p",
          sql.eq("p.user_id", "u.id"),
          sql.eq("p.active", sql.value(true)),
        ),
      "SELECT `u`.`name`, `p`.`title` FROM `users` AS `u` INNER JOIN `posts` AS `p` ON (`p`.`user_id` = `u`.`id` AND `p`.`active` = ?1)",
      [1],
    ],
    [
      sql.delete("users").join("posts", "p", sql.eq("p.user_id", "users.id")),
      "DELETE FROM `users` INNER JOIN `posts` AS `p` ON `p`.`user_id` = `users`.`id`",
      [],
    ],
    [
      sql
        .update("users")
        .join("posts", "p", sql.eq("p.user_id", "users.id"))
        .set("users.active", sql.value(false))
        .where(sql.eq("p.status", sql.value("deleted"))),
      "UPDATE `users` INNER JOIN `posts` AS `p` ON `p`.`user_id` = `users`.`id` SET `users`.`active` = ?1 WHERE `p`.`status` = ?2",
      [0, "deleted"],
    ],
    [
      sql.union(
        sql.select("id", "name").from("users"),
        sql.select("id", "name").from("admins"),
      ),
      "SELECT `id`, `name` FROM `users` UNION SELECT `id`, `name` FROM `admins`",
      [],
    ],
    [
      sql.union(
        sql.select("id", "name").from("users"),
        sql.union(
          sql.select("id", "name").from("admins"),
          sql.select("id", "name").from("sellers"),
          sql.select("id", "name").from("buyers"),
        ),
      ),
      "SELECT `id`, `name` FROM `users` UNION ( SELECT `id`, `name` FROM `admins` UNION SELECT `id`, `name` FROM `sellers` UNION SELECT `id`, `name` FROM `buyers` )",
      [],
    ],
    [
      sql.unionAll(
        sql.select("id", "name").from("users"),
        sql.select("id", "name").from("admins"),
      ),
      "SELECT `id`, `name` FROM `users` UNION ALL SELECT `id`, `name` FROM `admins`",
      [],
    ],
    [
      sql.unionAll(
        sql.select("id", "name").from("users"),
        sql.unionAll(
          sql.select("id", "name").from("admins"),
          sql.select("id", "name").from("sellers"),
          sql.select("id", "name").from("buyers"),
        ),
      ),
      "SELECT `id`, `name` FROM `users` UNION ALL ( SELECT `id`, `name` FROM `admins` UNION ALL SELECT `id`, `name` FROM `sellers` UNION ALL SELECT `id`, `name` FROM `buyers` )",
      [],
    ],
    [
      sql.intersect(
        sql.select("id", "name").from("users"),
        sql.select("id", "name").from("admins"),
      ),
      "SELECT `id`, `name` FROM `users` INTERSECT SELECT `id`, `name` FROM `admins`",
      [],
    ],
    [
      sql.intersect(
        sql.select("id", "name").from("users"),
        sql.intersect(
          sql.select("id", "name").from("admins"),
          sql.select("id", "name").from("sellers"),
          sql.select("id", "name").from("buyers"),
        ),
      ),
      "SELECT `id`, `name` FROM `users` INTERSECT ( SELECT `id`, `name` FROM `admins` INTERSECT SELECT `id`, `name` FROM `sellers` INTERSECT SELECT `id`, `name` FROM `buyers` )",
      [],
    ],
    [
      sql.except(
        sql.select("id", "name").from("users"),
        sql.select("id", "name").from("admins"),
      ),
      "SELECT `id`, `name` FROM `users` EXCEPT SELECT `id`, `name` FROM `admins`",
      [],
    ],
    [
      sql.except(
        sql.select("id", "name").from("users"),
        sql.except(
          sql.select("id", "name").from("admins"),
          sql.select("id", "name").from("sellers"),
          sql.select("id", "name").from("buyers"),
        ),
      ),
      "SELECT `id`, `name` FROM `users` EXCEPT ( SELECT `id`, `name` FROM `admins` EXCEPT SELECT `id`, `name` FROM `sellers` EXCEPT SELECT `id`, `name` FROM `buyers` )",
      [],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).orClause("IGNORE"),
      "INSERT OR IGNORE INTO `test` (`id`) VALUES (?1)",
      [123],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).orClause("FAIL"),
      "INSERT OR FAIL INTO `test` (`id`) VALUES (?1)",
      [123],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).orClause("ABORT"),
      "INSERT OR ABORT INTO `test` (`id`) VALUES (?1)",
      [123],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).orClause("REPLACE"),
      "INSERT OR REPLACE INTO `test` (`id`) VALUES (?1)",
      [123],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).orClause("ROLLBACK"),
      "INSERT OR ROLLBACK INTO `test` (`id`) VALUES (?1)",
      [123],
    ],
    [
      sql.insert("test", ["id"]).values(sql.value(123)).returning("id"),
      "INSERT INTO `test` (`id`) VALUES (?1) RETURNING `id`",
      [123],
    ],
    [
      sql
        .insert("test", ["id", "name"])
        .values(sql.value(123), sql.value("John"))
        .returning("id", "name"),
      "INSERT INTO `test` (`id`, `name`) VALUES (?1, ?2) RETURNING `id`, `name`",
      [123, "John"],
    ],
    [
      sql
        .insert("test", ["id", "name"])
        .values(sql.value(123), sql.value("John"))
        .returning(sql.call("LOWER", "name")),
      "INSERT INTO `test` (`id`, `name`) VALUES (?1, ?2) RETURNING LOWER(`name`)",
      [123, "John"],
    ],
    [
      sql.update("test").set("name", sql.value("John")).returning("id"),
      "UPDATE `test` SET `name` = ?1 RETURNING `id`",
      ["John"],
    ],
    [
      sql
        .update("test")
        .set("name", sql.value("John"))
        .where(sql.eq("id", sql.value(1)))
        .returning("id", "name"),
      "UPDATE `test` SET `name` = ?1 WHERE `id` = ?2 RETURNING `id`, `name`",
      ["John", 1],
    ],
    [
      sql
        .update("test")
        .set("name", sql.value("John"))
        .where(sql.eq("id", sql.value(1)))
        .returning(sql.call("LOWER", "name")),
      "UPDATE `test` SET `name` = ?1 WHERE `id` = ?2 RETURNING LOWER(`name`)",
      ["John", 1],
    ],
    [
      sql
        .delete("test")
        .where(sql.eq("id", sql.value(1)))
        .returning("id"),
      "DELETE FROM `test` WHERE `id` = ?1 RETURNING `id`",
      [1],
    ],
    [
      sql
        .delete("test")
        .where(sql.eq("id", sql.value(1)))
        .returning("id", "name", "created_at"),
      "DELETE FROM `test` WHERE `id` = ?1 RETURNING `id`, `name`, `created_at`",
      [1],
    ],
    [
      sql
        .delete("test")
        .where(sql.eq("id", sql.value(1)))
        .returning(sql.call("LOWER", "name")),
      "DELETE FROM `test` WHERE `id` = ?1 RETURNING LOWER(`name`)",
      [1],
    ],
  ];

  it.each(tests)(
    "[#%#]%c %s (%j)",
    (builder, expectedQuery, expectedParameters) => {
      expect(builder.build()).toStrictEqual({
        query: expectedQuery,
        parameters: expectedParameters,
      });
    },
  );
});
