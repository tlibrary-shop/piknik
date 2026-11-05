const crypto = require('crypto');

const OWNER = 'tlibrary-shop';
const REPO = 'piknik';
const FILE_PATH = 'data/piknik.json';
const API_BASE = 'https://api.github.com';

const seedParticipants = [
  {
    "id": "p-1",
    "position": 1,
    "name": "Tri Widyanto",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-2",
    "position": 2,
    "name": "Anastasya Widya Pranawengrum",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-3",
    "position": 3,
    "name": "Barbara Widyas Listyasari",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-4",
    "position": 4,
    "name": "Paulus Rochad",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-5",
    "position": 5,
    "name": "Tristan",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-6",
    "position": 6,
    "name": "Javas",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-7",
    "position": 7,
    "name": "Nunik Indarti",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-8",
    "position": 8,
    "name": "Nadiva Kautsar",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-9",
    "position": 9,
    "name": "Dinda Indarti",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-10",
    "position": 10,
    "name": "Sicilia Indira Sari",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-11",
    "position": 11,
    "name": "Dian Eka",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-12",
    "position": 12,
    "name": "Key",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-13",
    "position": 13,
    "name": "Putri Ambar Ayuningtyas",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-14",
    "position": 14,
    "name": "Atalia Angela Calista",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-15",
    "position": 15,
    "name": "Puji Astuti",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-16",
    "position": 16,
    "name": "Cella",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-17",
    "position": 17,
    "name": "Theodora Butar Puspita",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-18",
    "position": 18,
    "name": "Stevanus Panji",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-19",
    "position": 19,
    "name": "Yolenta Sekly",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-20",
    "position": 20,
    "name": "Sirilus Labowa",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-21",
    "position": 21,
    "name": "Fransisca Avisa Benita Christabel",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-22",
    "position": 22,
    "name": "Renaldo Ezra Perdana Chandra Herman",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-23",
    "position": 23,
    "name": "Suparmi",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-24",
    "position": 24,
    "name": "Azahira Jelita",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-25",
    "position": 25,
    "name": "Andreas Haris Susanto",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-26",
    "position": 26,
    "name": "Christin",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-27",
    "position": 27,
    "name": "Oxcel",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-28",
    "position": 28,
    "name": "Yessa",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-29",
    "position": 29,
    "name": "Friska Tarihoran",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-30",
    "position": 30,
    "name": "Endah Prihatin",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-31",
    "position": 31,
    "name": "Esha",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-32",
    "position": 32,
    "name": "Daniel Rigen Sasongko Aji",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-33",
    "position": 33,
    "name": "Cecilia Prima Normaningtyas",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-34",
    "position": 34,
    "name": "Lolyta Beby Kristina",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-35",
    "position": 35,
    "name": "Diah Ayu Kristiani",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-36",
    "position": 36,
    "name": "Berladinda Yosiasviolga",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-37",
    "position": 37,
    "name": "Rahel",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-38",
    "position": 38,
    "name": "Alent",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-39",
    "position": 39,
    "name": "Susana Setyawati K",
    "category": "Anggota",
    "is_active": true
  },
  {
    "id": "p-40",
    "position": 40,
    "name": "Ajeng Lia (Margono)",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-41",
    "position": 41,
    "name": "Bagus Tri (Margono)",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-42",
    "position": 42,
    "name": "Bpk Sri",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-43",
    "position": 43,
    "name": "Keluarga Bpk Sri",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-44",
    "position": 44,
    "name": "Bapak Wakijo",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-45",
    "position": 45,
    "name": "Keluarga Bapak Wakijo",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-46",
    "position": 46,
    "name": "Bapak Prapto",
    "category": "Tetangga",
    "is_active": true
  },
  {
    "id": "p-47",
    "position": 47,
    "name": "Keluarga Bapak Prapto",
    "category": "Tetangga",
    "is_active": true
  }
];
const emptyState = () => ({ participants: seedParticipants, events: [], announcements: [] });

function sign(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(body).digest('base64url');
  return body + '.' + sig;
}
function verify(token, secret) {
  try {
    const [body, sig] = String(token || '').split('.');
    const expected = crypto.createHmac('sha256', secret).update(body).digest();
    const actual = Buffer.from(sig, 'base64url');
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) return false;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
    return payload.exp > Date.now();
  } catch { return false; }
}
async function github(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Server belum dikonfigurasi: GITHUB_TOKEN belum tersedia.');
  const response = await fetch(API_BASE + path, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'GitHub storage error (' + response.status + ')');
    error.status = response.status;
    throw error;
  }
  return data;
}
async function readState() {
  try {
    const file = await github('/repos/' + OWNER + '/' + REPO + '/contents/' + FILE_PATH);
    const decoded = Buffer.from(file.content.replace(/\n/g, ''), 'base64').toString('utf8');
    return { state: JSON.parse(decoded), sha: file.sha };
  } catch (error) {
    if (error.status === 404) return { state: emptyState(), sha: null };
    throw error;
  }
}
async function writeState(state, sha) {
  const content = Buffer.from(JSON.stringify(state, null, 2), 'utf8').toString('base64');
  const result = await github('/repos/' + OWNER + '/' + REPO + '/contents/' + FILE_PATH, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Update data Piknik',
      content,
      ...(sha ? { sha } : {})
    })
  });
  return result;
}
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const secret = process.env.ADMIN_PASSWORD;
  if (!process.env.GITHUB_TOKEN || !secret) {
    return res.status(503).json({ error: 'Server belum dikonfigurasi. Pengelola perlu mengatur GITHUB_TOKEN dan ADMIN_PASSWORD satu kali di hosting.' });
  }
  try {
    if (req.method === 'GET') {
      const { state } = await readState();
      const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
      return res.status(200).json({ ...state, isAdmin: verify(token, secret) });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak didukung.' });
    const body = req.body || {};
    if (body.type === 'login') {
      if (typeof body.password !== 'string' || body.password !== secret) {
        return res.status(401).json({ error: 'Kata sandi koordinator salah.' });
      }
      return res.status(200).json({ token: sign({ exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }, secret) });
    }
    const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!verify(token, secret)) return res.status(401).json({ error: 'Sesi koordinator tidak valid. Silakan login kembali.' });
    const { state, sha } = await readState();
    if (!Array.isArray(state.participants)) state.participants = seedParticipants;
    if (!Array.isArray(state.events)) state.events = [];
    if (!Array.isArray(state.announcements)) state.announcements = [];
    if (body.type === 'event') {
      const participant = state.participants.find(p => p.id === body.participant_id);
      const allowedStops = ['andi_berangkat','lidulapa','saloka','andi_pulang'];
      if (!participant || !allowedStops.includes(body.stop_key) || !['turun','naik'].includes(body.action)) {
        return res.status(400).json({ error: 'Data checklist tidak valid.' });
      }
      state.events.push({ id: crypto.randomUUID(), participant_id: participant.id, stop_key: body.stop_key, action: body.action, created_at: new Date().toISOString() });
    } else if (body.type === 'participant') {
      const participant = state.participants.find(p => p.id === body.id);
      if (!participant || typeof body.name !== 'string' || !body.name.trim() || !['Anggota','Tetangga'].includes(body.category)) {
        return res.status(400).json({ error: 'Data peserta tidak valid.' });
      }
      participant.name = body.name.trim();
      participant.category = body.category;
    } else if (body.type === 'announcement') {
      if (typeof body.title !== 'string' || !body.title.trim() || typeof body.body !== 'string' || !body.body.trim()) {
        return res.status(400).json({ error: 'Judul dan isi pengumuman wajib diisi.' });
      }
      state.announcements.push({ id: crypto.randomUUID(), title: body.title.trim(), body: body.body.trim(), created_at: new Date().toISOString() });
    } else {
      return res.status(400).json({ error: 'Jenis perubahan tidak dikenal.' });
    }
    await writeState(state, sha);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Piknik API error:', error);
    const status = error.status === 409 ? 409 : 500;
    return res.status(status).json({ error: status === 409 ? 'Ada perubahan bersamaan. Muat ulang lalu coba lagi.' : 'Gagal menyimpan data. ' + error.message });
  }
};
