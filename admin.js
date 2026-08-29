const SUPABASE_URL = "https://mbigygpfxznlvcjfelvy.supabase.co";
const SUPABASE_KEY = "sb_publishable_hXo7cNYMBoPVxOJ_33gkkw_QjYt5e5u";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const DEFAULT_CONTENT = {
  seo: {
    title: "Vesper.ai — Operational AI Infrastructure",
    content: "Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business."
  },
  canonical: {title: "Canonical URL", content: "https://website-7yu.pages.dev/"},
  og_image: {title: "Open Graph Image", content: ""},
  video: {
    title: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4",
    content: ""
  },
  logo: {title: "Vesper.ai", content: ""},
  badge: {title: "Operational AI Infrastructure", content: ""},
  headline_pre: {title: "Train", content: ""},
  headline_em: {title: "AI agents", content: ""},
  headline_post: {title: "on your", content: ""},
  headline_line2: {title: "workflows in minutes.", content: ""},
  lede: {
    title: "Description",
    content: "Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business."
  },
  nav_benefits: {title: "Benefits", content: "benefits.html"},
  nav_how: {title: "How It Works", content: "how-it-works.html"},
  nav_faqs: {title: "FAQs", content: "faq.html"},
  nav_pricing: {title: "Pricing", content: "pricing.html"},
  cta_primary: {title: "Start for Free", content: "mailto:hello@example.com?subject=Start%20for%20Free"},
  cta_secondary: {title: "See it in action", content: "how-it-works.html"},
  stat_1: {title: "4.2M+ workflows automated", content: ""},
  stat_2: {title: "92% reduction in manual operations", content: ""},
  stat_3: {title: "180+ operational teams onboarded", content: ""},
  benefits_kicker: {title: "Built for operations", content: ""},
  benefits_title: {title: "Turn repeatable work into durable AI systems.", content: ""},
  benefits_intro: {title: "Introduction", content: "Vesper agents learn your workflows, work with your tools, and improve with every completed task."},
  benefits_1: {title: "Faster execution", content: "Automate multi-step operational work without rebuilding your existing stack."},
  benefits_2: {title: "Human-level control", content: "Keep approvals, exceptions, and audit trails exactly where your team needs them."},
  benefits_3: {title: "Compounding knowledge", content: "Every workflow becomes reusable operational knowledge instead of another manual playbook."},
  how_kicker: {title: "From process to agent", content: ""},
  how_title: {title: "Launch an operational agent in four clear steps.", content: ""},
  how_intro: {title: "Introduction", content: "Connect the tools you already use, demonstrate the outcome, and let Vesper handle reliable execution."},
  how_1: {title: "Choose a workflow", content: "Start with a frequent, rules-based task that consumes valuable team time."},
  how_2: {title: "Connect your tools", content: "Give the agent scoped access to the systems and data required for the job."},
  how_3: {title: "Teach by example", content: "Show successful outcomes and define the moments where a human should approve."},
  how_4: {title: "Measure and scale", content: "Track quality, speed, and exceptions, then deploy the pattern across your operation."},
  pricing_kicker: {title: "Simple, scalable pricing", content: ""},
  pricing_title: {title: "Start with one workflow. Scale without friction.", content: ""},
  pricing_intro: {title: "Introduction", content: "Choose a plan based on the complexity and volume of the operations you want to automate."},
  pricing_1: {title: "Starter", content: "One production workflow\nCore integrations\nEmail support"},
  pricing_1_price: {title: "Custom", content: ""},
  pricing_2: {title: "Growth", content: "Multiple workflows\nAdvanced integrations\nPriority support"},
  pricing_2_price: {title: "Custom", content: ""},
  pricing_3: {title: "Enterprise", content: "Unlimited workflows\nSecurity review\nDedicated success team"},
  pricing_3_price: {title: "Custom", content: ""},
  faq_kicker: {title: "Frequently asked questions", content: ""},
  faq_title: {title: "Everything you need to evaluate Vesper.", content: ""},
  faq_intro: {title: "Introduction", content: "Clear answers about setup, security, integrations, control, and pricing."},
  faq_1: {title: "What can Vesper automate?", content: "Vesper is designed for repeatable, multi-step operational workflows that move information or decisions across your existing tools."},
  faq_2: {title: "Do we need to replace our current software?", content: "No. Agents connect to the systems your team already uses and operate within the access you grant."},
  faq_3: {title: "How do approvals and exceptions work?", content: "You define checkpoints, escalation rules, and human approvals for sensitive or unusual cases."},
  faq_4: {title: "How long does setup take?", content: "A focused workflow can often be mapped quickly; production timing depends on integrations, data access, and review requirements."},
  faq_5: {title: "How is pricing calculated?", content: "Pricing reflects workflow complexity, execution volume, integrations, and the level of support required."}
};

const sections = Object.keys(DEFAULT_CONTENT);
const LEGACY_LINKS = {
  "#benefits": "benefits.html",
  "#how-it-works": "how-it-works.html",
  "#faqs": "faq.html",
  "#pricing": "pricing.html",
  "#demo": "how-it-works.html"
};
const loginPanel = document.getElementById("loginPanel");
const cmsPanel = document.getElementById("cmsPanel");
const loginMessage = document.getElementById("loginMessage");
const saveMessage = document.getElementById("saveMessage");

function setMessage(node, text, isError = false) {
  node.textContent = text;
  node.classList.toggle("error", isError);
}

function formControls() {
  return Array.from(document.querySelectorAll("[data-section][data-field]"));
}

function mergeRows(rows = []) {
  const content = structuredClone(DEFAULT_CONTENT);
  rows.forEach((row) => {
    if (!content[row.section]) return;
    content[row.section] = {
      title: row.title ?? content[row.section].title,
      content: LEGACY_LINKS[row.content] ?? row.content ?? content[row.section].content
    };
  });
  return content;
}

function fillForm(content) {
  formControls().forEach((input) => {
    const section = input.dataset.section;
    const field = input.dataset.field;
    input.value = content[section]?.[field] ?? "";
  });
}

function collectRows() {
  const draft = structuredClone(DEFAULT_CONTENT);
  formControls().forEach((input) => {
    const section = input.dataset.section;
    const field = input.dataset.field;
    draft[section][field] = input.value.trim();
  });
  return Object.entries(draft).map(([section, value]) => ({
    section,
    title: value.title,
    content: value.content
  }));
}

async function showCms() {
  loginPanel.hidden = true;
  cmsPanel.hidden = false;
  await loadContent();
}

async function showLogin() {
  loginPanel.hidden = false;
  cmsPanel.hidden = true;
}

async function login() {
  setMessage(loginMessage, "正在登录...");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const {error} = await db.auth.signInWithPassword({email, password});
  if (error) {
    setMessage(loginMessage, error.message || "登录失败", true);
    return;
  }

  setMessage(loginMessage, "登录成功");
  await showCms();
}

async function logout() {
  await db.auth.signOut();
  setMessage(saveMessage, "");
  await showLogin();
}

async function loadContent() {
  setMessage(saveMessage, "正在从 Supabase 读取内容...");
  const {data, error} = await db
    .from("site_content")
    .select("section,title,content")
    .in("section", sections);

  if (error) {
    fillForm(DEFAULT_CONTENT);
    setMessage(saveMessage, `读取失败：${error.message}`, true);
    return;
  }

  fillForm(mergeRows(data));
  setMessage(saveMessage, "内容已加载。修改后点击保存即可发布。");
}

async function saveContent(event) {
  event.preventDefault();
  setMessage(saveMessage, "正在保存到 Supabase...");

  const {error} = await db
    .from("site_content")
    .upsert(collectRows(), {onConflict: "section"});

  if (error) {
    setMessage(saveMessage, `保存失败：${error.message}`, true);
    return;
  }

  setMessage(saveMessage, "保存成功。刷新首页即可看到最新内容。");
}

document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("logoutButton").addEventListener("click", logout);
document.getElementById("contentForm").addEventListener("submit", saveContent);

db.auth.getSession().then(({data}) => {
  if (data.session) {
    showCms();
  } else {
    showLogin();
  }
});
