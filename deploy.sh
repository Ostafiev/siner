#!/bin/bash
# Отправка правок на сайт одной командой.
#
#   ./deploy.sh "убрал цены в избранном"
#
# Скрипт складывает все изменения в коммит и отправляет их на GitHub.
# Дальше GitHub сам собирает сайт и выкладывает — примерно две минуты.
# Следить за сборкой: вкладка Actions в репозитории.

set -e
cd "$(dirname "$0")"

MESSAGE="${1:-Правки}"

if [ -z "$(git status --porcelain)" ]; then
  echo "Изменений нет — отправлять нечего."
  exit 0
fi

echo "Изменённые файлы:"
git status --short
echo

git add -A
git commit -m "$MESSAGE"
git push

echo
echo "Готово. Сборка идёт во вкладке Actions, сайт обновится через 1–3 минуты."
