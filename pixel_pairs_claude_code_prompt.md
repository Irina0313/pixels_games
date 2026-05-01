# Pixel Pairs — Claude Code Prompt

Сделай веб-игру на **React + TypeScript + Tailwind CSS**.

Название игры: **Pixel Pairs**.

Это классическая **memory card game** для дизайн-студии. В игре есть карточки сотрудников. Игрок открывает две карты. Если изображения совпали — пара остаётся открытой. Если не совпали — обе карты переворачиваются обратно через короткую задержку. Цель — найти все пары за минимальное количество ходов и времени.

---

## Важно

- Никаких статов, рейтингов, способностей и сравнений людей.
- На карточках только изображение сотрудника.
- Игра должна быть простой, визуальной и приятной.
- Все ассеты должны быть легко заменяемыми.
- Не использовать backend.
- Всё должно работать локально.
- Код должен быть чистым, понятным и разделённым на компоненты.

---

## Stack

Используй:

- React
- TypeScript
- Tailwind CSS
- Vite

Можно использовать **Framer Motion** для flip-анимаций, если он уже доступен в проекте.

Если Framer Motion не установлен, не добавляй его насильно. В этом случае сделай flip, hover и shake-анимации через CSS/Tailwind.

Не использовать дополнительные UI-библиотеки.
Не использовать внешние изображения, CDN или remote URLs для ассетов.

---

## Project structure

Если проект уже создан, не переустанавливай React/Vite. Только добавь или измени нужные файлы.

Если проекта нет, создай Vite-проект с React + TypeScript и настрой Tailwind CSS.

Желаемая структура:

```txt
src/
  App.tsx
  main.tsx
  index.css
  types.ts
  config/
    gameConfig.ts
  data/
    people.ts
  components/
    StartScreen.tsx
    GameScreen.tsx
    GameHeader.tsx
    GameBoard.tsx
    MemoryCard.tsx
    ResultScreen.tsx
    RecordsTable.tsx
    ModeCard.tsx
  utils/
    game.ts
    records.ts
```

Используй функциональные компоненты и React hooks.

---

## Types

Создай типы в `src/types.ts`:

```ts
type GameMode = "quick" | "full";
type AppState = "start" | "game" | "result";

interface Person {
  id: string;
  image: string;
}

interface Card {
  id: string;
  personId: string;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface RecordItem {
  mode: GameMode;
  moves: number;
  timeSeconds: number;
  date: string;
}
```

При необходимости можешь добавить дополнительные типы, но базовые типы должны остаться понятными и простыми.

---

## Main screens

Сделай 3 основных экрана:

1. Start Screen
2. Game Screen
3. Result Screen

Состояние приложения:

```ts
appState: "start" | "game" | "result"
selectedMode: "quick" | "full"
```

---

# 1. Start Screen

На стартовом экране должно быть:

## Title

```txt
Pixel Pairs
```

## Subtitle

```txt
Open two cards. Find all matching pairs.
```

## Rules

```txt
Rules:
1. Open two cards.
2. If the images match, the pair stays open.
3. If they don't match, the cards flip back.
4. Find all pairs with fewer moves and better time.
```

## Mode selection

Должны быть две карточки выбора режима:

### Quick Mode

```txt
9 people / 18 cards
```

### Full Team

```txt
18 people / 36 cards
```

Кнопки режимов должны сразу запускать игру.

## Top Records block

На Start Screen показать:

- records для Quick Mode;
- records для Full Team;
- если records нет, показать `No records yet.`

---

# 2. Game Screen

На игровом экране должно быть:

## Header

Покажи:

- Pixel Pairs
- выбранный режим
- Moves
- Time
- Restart
- Change Mode

## Game board

Покажи игровое поле с карточками.

Использовать `/assets/board-bg.svg` как фон игрового пространства.

Если ассет отсутствует или не загрузился, использовать красивый CSS fallback.

---

## Game logic

- Таймер стартует после первого клика по карточке.
- Таймер увеличивается каждую секунду.
- Таймер останавливается сразу после нахождения последней пары.
- Один ход считается после открытия второй карты.
- Игрок может открыть максимум две карты за раз.
- Нельзя кликать по уже открытой карте.
- Нельзя кликать по найденной карте.
- Нельзя открыть третью карту, пока две карты проверяются.
- Если `personId` совпадает — карты остаются открытыми.
- Если `personId` не совпадает — карты закрываются через `700ms`.
- Когда все пары найдены — игра заканчивается и открывается Result Screen.

Добавь состояние:

```ts
isCheckingPair: boolean
```

Пока `isCheckingPair === true`:

- клики по карточкам игнорируются;
- нельзя открыть третью карту;
- после проверки пары состояние возвращается в `false`.

---

## Restart behavior

Кнопка `Restart`:

- перезапускает игру в текущем режиме;
- создаёт новую перемешанную колоду;
- сбрасывает moves;
- сбрасывает timer;
- сбрасывает matched cards;
- не очищает localStorage records.

## Change Mode behavior

Кнопка `Change Mode`:

- возвращает на Start Screen;
- не очищает localStorage records.

---

# 3. Result Screen

После победы показать финальный экран или модальное окно.

## Title

```txt
All pairs found!
```

## Show result

Показать:

- режим;
- количество ходов;
- время;
- место игрока в таблице рекордов.

Примеры текста:

```txt
New record! #1
You placed #3
Not in top 5 — try again
```

## Buttons

Показать кнопки:

- Play Again
- Change Mode

`Play Again`:

- запускает новую игру в том же режиме;
- создаёт новую перемешанную колоду;
- сбрасывает moves и timer.

`Change Mode`:

- возвращает на Start Screen.

## Records

На Result Screen показать Top Records только для текущего режима.

---

## Game modes

### quick

- случайно выбрать 9 сотрудников из 18;
- сделать по 2 карты каждого;
- всего 18 карт.

### full

- использовать всех 18 сотрудников;
- сделать по 2 карты каждого;
- всего 36 карт.

Перед каждой игрой перемешивать карты.

---

## Data

Создай массив `people` в `src/data/people.ts`:

```ts
export const people = [
  { id: "person-01", image: "/assets/team/person-01.svg" },
  { id: "person-02", image: "/assets/team/person-02.svg" },
  { id: "person-03", image: "/assets/team/person-03.svg" },
  { id: "person-04", image: "/assets/team/person-04.svg" },
  { id: "person-05", image: "/assets/team/person-05.svg" },
  { id: "person-06", image: "/assets/team/person-06.svg" },
  { id: "person-07", image: "/assets/team/person-07.svg" },
  { id: "person-08", image: "/assets/team/person-08.svg" },
  { id: "person-09", image: "/assets/team/person-09.svg" },
  { id: "person-10", image: "/assets/team/person-10.svg" },
  { id: "person-11", image: "/assets/team/person-11.svg" },
  { id: "person-12", image: "/assets/team/person-12.svg" },
  { id: "person-13", image: "/assets/team/person-13.svg" },
  { id: "person-14", image: "/assets/team/person-14.svg" },
  { id: "person-15", image: "/assets/team/person-15.svg" },
  { id: "person-16", image: "/assets/team/person-16.svg" },
  { id: "person-17", image: "/assets/team/person-17.svg" },
  { id: "person-18", image: "/assets/team/person-18.svg" }
];
```

---

## Card model

Каждая карта должна иметь:

- `id`
- `personId`
- `image`
- `isFlipped`
- `isMatched`

При создании deck каждая карточка должна получать уникальный `id`.

Например:

```ts
`${person.id}-a-${gameId}`
`${person.id}-b-${gameId}`
```

или другой стабильный уникальный формат.

Главное: `id` должен быть уникальным и подходить для React key.

---

## Card visual structure

Карточка имеет две стороны.

### Back side

Использовать:

```txt
/assets/card-back.svg
```

### Front side

Использовать:

```txt
/assets/card-front.svg
```

как оформление карты.

Внутри front side показывать image сотрудника.

Если SVG-файлов нет, приложение не должно ломаться.

---

## Assets via Figma MCP

Все визуальные ассеты должны быть загружены или экспортированы из Figma через **Figma MCP**.

Используй Figma MCP, чтобы получить нужные ассеты:

- employee images: `person-01.svg` ... `person-18.svg`
- card back: `card-back.svg`
- card front frame: `card-front.svg`
- board background: `board-bg.svg`

Экспортируй и сохрани их в проекте так:

```txt
public/assets/team/person-01.svg
public/assets/team/person-02.svg
public/assets/team/person-03.svg
public/assets/team/person-04.svg
public/assets/team/person-05.svg
public/assets/team/person-06.svg
public/assets/team/person-07.svg
public/assets/team/person-08.svg
public/assets/team/person-09.svg
public/assets/team/person-10.svg
public/assets/team/person-11.svg
public/assets/team/person-12.svg
public/assets/team/person-13.svg
public/assets/team/person-14.svg
public/assets/team/person-15.svg
public/assets/team/person-16.svg
public/assets/team/person-17.svg
public/assets/team/person-18.svg

public/assets/card-back.svg
public/assets/card-front.svg
public/assets/board-bg.svg
```

React-приложение должно ссылаться на ассеты через public paths:

```txt
/assets/team/person-01.svg
/assets/card-back.svg
/assets/card-front.svg
/assets/board-bg.svg
```

Не генерировать случайные изображения сотрудников.
Не заменять изображения сотрудников внешними картинками.
Не использовать remote URLs.
Не инлайнить большие SVG прямо в React-компоненты, если в этом нет необходимости.

Перед финальной версткой UI:

- изучи доступные Figma assets через Figma MCP;
- используй Figma как source of truth для визуального стиля;
- сохрани пропорции, размеры карточек, цвета и общее ощущение дизайна максимально близко к Figma;
- если в Figma есть именованные frames/components для cards, board, backgrounds или employee avatars, используй их как источник.

Если имена ассетов в Figma отличаются от указанных выше:

- экспортируй нужные ассеты;
- сохрани их в проекте с требуемыми filenames;
- в коде используй стабильные пути из `public/assets/...`.

Если Figma MCP asset export fails или часть ассетов отсутствует:

- приложение должно продолжать работать;
- используй CSS-based visual fallbacks;
- оставь ожидаемые file paths в коде, чтобы ассеты можно было заменить позже.

---

## Asset fallbacks

Если image сотрудника не загрузился:

- показать чистый placeholder;
- можно использовать label вида `P01`, `P02`, etc.;
- такой label допустим только как fallback при отсутствии ассета.

Если `/assets/card-back.svg` или `/assets/card-front.svg` не загрузились:

- использовать CSS gradient;
- border;
- shadow;
- digital/card-like styling.

Если `/assets/board-bg.svg` не загрузился:

- использовать CSS background через Tailwind или inline style;
- приложение не должно crash из-за отсутствующих файлов.

---

## Records

Сделай локальные рекорды через `localStorage`.

Для каждого режима отдельно:

- `quickRecords`
- `fullRecords`

Каждый record:

```ts
{
  mode: GameMode;
  moves: number;
  timeSeconds: number;
  date: string;
}
```

Сортировка:

1. меньше `moves` — выше;
2. если `moves` одинаковые — меньше `timeSeconds` выше.

Хранить top-5 результатов для каждого режима.

---

## Result ranking logic

После победы:

1. Создать новый record.
2. Получить существующие records для текущего режима.
3. Посчитать rank нового результата среди всех records + новый record.
4. Сохранить только top-5 records.
5. На Result Screen показать rank.

Тексты:

```txt
if rank === 1: New record! #1
if rank <= 5: You placed #rank
if rank > 5: Not in top 5 — try again
```

Важно: rank нужно считать до обрезания списка до top-5, чтобы корректно показать `Not in top 5`.

---

## Time format

Создай функцию `formatTime`.

Формат времени:

```txt
mm:ss
```

Примеры:

```txt
0 -> 00:00
5 -> 00:05
65 -> 01:05
600 -> 10:00
```

---

## RecordsTable

Компонент `RecordsTable` должен показывать:

- Place
- Moves
- Time
- Date

Если records пустой, показать:

```txt
No records yet.
```

Date форматировать кратко:

```txt
YYYY-MM-DD
```

---

## Visual style

Общее направление:

- тёмный фон;
- крупная типографика;
- аккуратная сетка;
- ощущение digital-эксперимента дизайн-студии;
- не детский arcade;
- карточки должны выглядеть как кастомные коллекционные карты;
- поле игры должно ощущаться как отдельная игровая зона;
- плавный hover;
- flip-анимация карточки;
- найденные пары должны выглядеть найденными: opacity, glow или лёгкая подсветка;
- при несовпадении добавить лёгкий shake;
- адаптивная сетка.

---

## Layout

### Quick Mode

- desktop: 6 колонок;
- tablet: 4 колонки;
- mobile: 3 колонки.

### Full Team

- desktop: 6 колонок;
- tablet: 4 колонки;
- mobile: 3 колонки.

Карточки должны сохранять одинаковый aspect-ratio, например `3/4`.

На desktop Full Team должен помещаться удобно без чрезмерного вертикального скролла.

Используй responsive gap и max-width для board.

---

## Components

Раздели код на компоненты:

- `App`
- `StartScreen`
- `GameScreen`
- `GameHeader`
- `GameBoard`
- `MemoryCard`
- `ResultScreen`
- `RecordsTable`
- `ModeCard`

Компоненты должны быть простыми, читаемыми и переиспользуемыми.

---

## Config

Вынеси игровые тексты, описания режимов и пути ассетов в отдельные константы:

```txt
src/config/gameConfig.ts
```

Пример того, что стоит вынести:

- title;
- subtitle;
- rules;
- mode labels;
- mode descriptions;
- asset paths;
- localStorage keys;
- mismatch delay;
- max records count.

---

## Utils

Создай функции:

### `src/utils/game.ts`

- `shuffleArray`
- `createDeck`
- `formatTime`

### `src/utils/records.ts`

- `getRecords`
- `saveRecord`
- `getPlayerRank`

Функции должны быть типизированы.

---

## Accessibility

Минимальные требования:

- карточки должны быть `button` elements или иметь корректный `role="button"`;
- добавить `aria-label` для карточек;
- disabled для matched/open/checking cards;
- Restart, Change Mode и Play Again должны быть обычными `button`;
- интерактивные элементы должны быть доступны с клавиатуры.

---

## Acceptance criteria

Готовая версия считается успешной, если:

- приложение запускается локально;
- Start Screen показывает правила, режимы и records;
- Quick Mode создаёт 18 карточек из 9 случайных сотрудников;
- Full Team создаёт 36 карточек из 18 сотрудников;
- карты перемешиваются перед каждой игрой;
- таймер стартует после первого клика;
- moves увеличиваются после открытия второй карты;
- совпавшие пары остаются открытыми;
- несовпавшие пары закрываются через 700ms;
- нельзя открыть третью карту во время проверки;
- после нахождения всех пар открывается Result Screen;
- результат сохраняется в localStorage;
- records сортируются по moves, потом по time;
- хранится top-5 records для каждого режима;
- Result Screen показывает корректный rank;
- Restart и Play Again создают новую игру;
- Change Mode возвращает на Start Screen;
- отсутствие SVG-ассетов не ломает приложение;
- код разделён на компоненты и utils;
- все основные тексты и asset paths легко заменить.

---

## Final task

Сделай готовую рабочую версию игры **Pixel Pairs**.

Используй Figma MCP для ассетов, React + TypeScript + Tailwind CSS для реализации и clean component-based architecture для кода.
