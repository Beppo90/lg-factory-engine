# LG Factory — Deployment Guide (Google Cloud + beppo-app.online)

From zero to `https://beppo-app.online` with your LG Factory dashboard running.

---

## Step 1: Create a Google Cloud Account & Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account (or create one)
3. Click **Create Project** → name it `lg-factory` → **Create**
4. Make sure billing is enabled (you need a credit card, but GCP has a $300 free trial for new accounts)

> **Free tier:** GCP gives you 1x `e2-micro` VM free forever (in `us-central1`). It's small (0.25 vCPU, 1 GB RAM) but works for testing. For production, use `e2-small` (~$15/mo).

---

## Step 2: Create the VM (Compute Engine)

1. Go to **Compute Engine → VM instances** (or search "VM instances" in the top bar)
2. Click **Create Instance**
3. Configure:

| Setting | Value |
|---|---|
| **Name** | `lg-factory` |
| **Region** | `us-central1` (Iowa) — free tier eligible |
| **Zone** | `us-central1-a` (or any `us-central1` zone) |
| **Machine type** | `e2-small` (2 vCPU, 2 GB RAM) — or `e2-micro` for free tier |
| **Boot disk** | Ubuntu 22.04 LTS, 20 GB SSD |
| **Firewall** | Check **Allow HTTP traffic** and **Allow HTTPS traffic** |

4. Click **Create**
5. Wait ~30 seconds for the VM to start
6. Note the **External IP** — looks like `34.xx.xxx.xxx`

---

## Step 3: Connect via SSH (Browser)

The easiest way is GCP's built-in browser SSH:

1. In **VM instances**, find your `lg-factory` VM
2. Click the **SSH** button (opens a terminal in your browser)
3. You're in. The prompt shows `username@lg-factory:~$`

Update the system:

```bash
sudo apt update && sudo apt upgrade -y
```

> **Note:** In GCP you don't use `root` directly. You use your Google username and `sudo` for admin commands.

---

## Step 4: Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

**Close the browser SSH tab and open a new one** (this picks up the docker group change).

Verify:

```bash
docker --version
docker compose version
```

---

## Step 5: Upload the Project

### Option A: gcloud CLI (fastest, from your Mac)

If you don't have `gcloud` installed:
```bash
# Install Google Cloud SDK
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

Then upload:
```bash
cd /Users/Beppo/Projects/fpi-sena-factory
gcloud compute scp --recurse lg-factory-engine lg-factory:~/
```

### Option B: FileZilla (SFTP)

1. In GCP Console → **Compute Engine → VM instances**
2. Click the **SSH** dropdown arrow → **View gcloud command**
3. Copy the command, it shows your username and external IP
4. In FileZilla:

| Field | Value |
|---|---|
| **Host** | `sftp://YOUR_VPS_IP` |
| **Username** | your Google username (shown in gcloud command) |
| **Port** | `22` |
| **Logon type** | Key file |
| **Key file** | `~/.ssh/google_compute_engine` |

> GCP auto-generates SSH keys. The private key is at `~/.ssh/google_compute_engine` on your Mac.

5. Upload the `lg-factory-engine` folder to the remote home directory (`/home/username/`)

### Option C: Git clone (simplest)

Since you have the repo on GitHub:
```bash
cd ~
git clone https://github.com/Beppo90/lg-factory-engine.git
```

Verify:

```bash
ls ~/lg-factory-engine/
```

---

## Step 6: Configure Environment

```bash
cd ~/lg-factory-engine
cp .env.example .env
nano .env
```

Fill in your API keys:

```
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-KEY-HERE
GOOGLE_API_KEY=AIza-YOUR-KEY-HERE
ANTHROPIC_ADMIN_API_KEY=sk-ant-admin-YOUR-KEY-HERE
```

Save: `Ctrl+O`, `Enter`, `Ctrl+X`.

---

## Step 7: First Launch (HTTP test)

```bash
cd ~/lg-factory-engine
docker compose up -d --build
```

First build takes ~2-3 minutes.

Check status:

```bash
docker compose ps
```

Test:

```bash
curl http://localhost/api/health
```

Expected: `{"status":"ok","version":"0.1.0"}`

Test in browser: open `http://YOUR_VPS_IP` — you should see the LG Factory dashboard.

---

## Step 8: Open Firewall Ports (GCP Console)

GCP has its own firewall — you configure it in the console, not via `ufw`.

1. Go to **VPC Network → Firewall** (or search "Firewall" in the top bar)
2. Click **Create Firewall Rule**
3. Configure:

| Setting | Value |
|---|---|
| **Name** | `allow-lg-factory` |
| **Targets** | All instances in the network |
| **Source filter** | `0.0.0.0/0` |
| **Protocols and ports** | Check **TCP**, enter `80, 443` |
| **Priority** | `1000` |

4. Click **Create**

> Port 22 (SSH) is already open by default in GCP.

---

## Step 9: Point beppo-app.online to Your VPS

Wherever you manage DNS for beppo-app.online (Hostinger, Namecheap, Cloudflare, etc.):

Add these A records:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `YOUR_VPS_IP` | 300 |
| A | `www` | `YOUR_VPS_IP` | 300 |

Wait 5-10 minutes, then verify:

```bash
ping beppo-app.online
```

Should show your VPS IP.

---

## Step 10: Enable HTTPS (SSL)

```bash
cd ~/lg-factory-engine
chmod +x setup-ssl.sh
./setup-ssl.sh beppo-app.online
```

The script requests a Let's Encrypt certificate and configures HTTPS auto-renewal.

Verify:

```bash
curl https://beppo-app.online/api/health
```

Open **https://beppo-app.online** — dashboard with lock icon.

---

## Cheat Sheet

```bash
# ─── Connect (browser SSH) ───
# Go to console.cloud.google.com → Compute Engine → VM instances → SSH

# ─── Connect (terminal from Mac) ───
gcloud compute ssh lg-factory

# ─── Upload files ───
gcloud compute scp --recurse local-folder lg-factory:~/

# ─── Go to project ───
cd ~/lg-factory-engine

# ─── See what's running ───
docker compose ps

# ─── Watch live logs ───
docker compose logs -f
docker compose logs -f api

# ─── Update code (git pull, then) ───
git pull && docker compose up -d --build

# ─── Restart ───
docker compose restart

# ─── Stop everything ───
docker compose down

# ─── Check resources ───
docker stats
```

---

## Troubleshooting

**Dashboard won't load**
```bash
docker compose ps
docker compose logs api
docker compose logs nginx
```

**Can't connect via SSH**
- Check VM is running in Compute Engine console
- Try the browser SSH button (always works)

**Port 80 not accessible from outside**
- Go to VPC Network → Firewall → verify `allow-lg-factory` rule exists with ports `80, 443`

**"ANTHROPIC_API_KEY not set"**
```bash
cat .env    # Make sure keys are filled in
```

**SSL won't generate**
- DNS must point to VPS: `ping beppo-app.online`
- Firewall must allow port 80 (check firewall rules)
- Check certbot logs: `docker compose logs certbot`

**Renew certificate manually**
```bash
docker compose run --rm certbot renew
docker compose restart nginx
```

---

## Cost Summary

| Item | Monthly Cost |
|---|---|
| GCP e2-small VM | ~$15/mo (or free with e2-micro) |
| Domain (beppo-app.online) | already owned |
| SSL (Let's Encrypt) | free |
| **Total** | **~$0-15/mo** |

API costs (Anthropic/Google) are separate — roughly $4-5 per complete program generation.

> **Tip:** Set a billing alert at [console.cloud.google.com/billing](https://console.cloud.google.com/billing) to avoid surprises.
