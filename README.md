# CoBLOC

Continuous Block Level Fairness on Data Streams. A React + Vite UI for the
[Streaming-p-Fairness](https://github.com/Subhodeep01/Streaming-p-Fairness) engine.

The UI streams records through Kafka, checks each sliding window for p-fairness,
and can reorder a window with `bfair` to make its blocks fair.

## What you need running

Three things, in this order. The UI on its own will just sit at "Connecting to
backend…". It needs the other two.

| | what | where |
|---|---|---|
| 1 | Kafka + Zookeeper | Docker, port 9092 |
| 2 | FastAPI backend | `Streaming-p-Fairness`, port 8000 |
| 3 | This UI | port 5173 |

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Python 3.11+
- [Docker Desktop](https://www.docker.com/products/docker-desktop), running

## Setup

Clone both repos side by side:

```bash
git clone https://github.com/Subhodeep01/Streaming-p-Fairness.git
git clone https://github.com/Subhodeep01/CoBLOC.git
```

Install the backend dependencies:

```bash
cd Streaming-p-Fairness
pip install -r api/requirements.txt
```

Download the datasets from [OSF](https://osf.io/q4fu2/overview?view_only=04e3328f2c514ee3b8f4a4822f1c9a23)
and put the CSVs in `Streaming-p-Fairness/datasets/`. The folder is gitignored,
so it will not arrive with the clone. A dataset whose CSV is missing shows up
in the dropdown but fails to load its attributes.

Install the UI dependencies:

```bash
npm install
```

## Running

**1. Kafka**, from the `Streaming-p-Fairness` directory:

```bash
docker compose -f zk-single-kafka-single.yml up -d
```

**2. Backend**, from the `Streaming-p-Fairness` root, not from `api/`:

```bash
uvicorn api.main:app --reload --port 8000
```

**3. UI**, from this directory:

```bash
npm run dev
```

Open `http://localhost:5173`. The sidebar shows "Connected" once it reaches the
backend.

## Using it

1. Pick a **Topic of Exploration** (dataset) and a **Protected Attribute**.
2. Set the **Constraints**, the target share for each attribute value. They are
   scaled to sum to 1, so `20/20/20/20/20` and `1/1/1/1/1` mean the same thing.
3. Set **Window Size**, **Block Size** (must divide the window), and
   **Landmark Size**.
4. Click **Produce data to Kafka**, wait for it to finish, then **Monitor**.
5. Step through windows. An unfair window offers **Reorder**; if reordering
   within the window is not enough, it offers **Reorder with Landmark**, which
   looks ahead at incoming records.

### Choosing a landmark size

Bigger is better, up to the maximum of 100. A reorder confined to one window
has only that window's records to work with, and the look-ahead is what gives
it room.

Measured on Movies / Release Era, window 20, block 5, five eras at 20%:

| landmark | blocks fair |
|---|---|
| 1 | 40% |
| 10 | 69% |
| 20 | 88% |
| 40 | 97% |
| 60 | 99% |
| 100 | 99% |

It flattens out around 80, so the 100 ceiling is not the limiting factor. The
ceiling exists because the landmark recommendation sweeps every size from 1 up
to it when the session ends, and that sweep costs roughly the square of the
landmark: 100 takes about 20 seconds, while 5000 would run for hours.

If a reorder appears to do nothing, the landmark is almost always too small.

### When constraints cannot be met

The reorder returns the best arrangement possible for the records available, so
if it still falls short the constraints are unreachable for that data. The UI
says so rather than reporting success. Leftover records that cannot fit a fair
block are grouped at the end of the window.

## Installing the backend as a package

Instead of running from a checkout, the backend can be installed and run from
anywhere:

```bash
pip install .
cobloc --datasets /path/to/your/csvs
```

That gives you a `cobloc` command with `--port`, `--host`, `--datasets` and
`--broker`. The same settings can come from `COBLOC_DATASETS` and
`COBLOC_BROKER` environment variables. You still need Kafka running.

## Using your own datasets

Drop any CSV into the datasets folder and it appears in the dropdown next to
the five bundled ones. Columns with between 2 and 20 distinct values are
offered as protected attributes, and each value's share of the file becomes its
suggested constraint. Nothing else is required: no config entry, no code.

## Other commands

```bash
npm run build      # production build
npm run preview    # preview the production build
npm run lint       # ESLint
```
