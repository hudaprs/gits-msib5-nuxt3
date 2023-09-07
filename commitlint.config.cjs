module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "build",
        "ci",
        "chore",
        "perf",
      ],
    ],
    "type-case": [2, "always", "lowerCase"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lowerCase"],
  },
};
