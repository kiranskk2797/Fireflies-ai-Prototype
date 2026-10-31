import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import {
  Activity, ArrowLeftRight, BarChart3, Bell, Bot, Check, CheckCircle2, ChevronDown,
  CircleHelp, FileText, Home, ListChecks, MessagesSquare, MoreHorizontal, Plug,
  Plus, RotateCcw, Search, Settings, ShieldCheck, Sparkles, Upload, Video, X, Zap,
} from 'lucide-react';

type Status = 'candidate' | 'open' | 'blocked' | 'pending' | 'done' | 'reassigned' | 'dropped' | 'declined';
type ThemePreference = 'system' | 'light' | 'dark';
type Priority = 'low' | 'medium' | 'high';
type EventItem = { label: string; at: string };
type SupportingDocument = { name: string; type: string; size: number };
type Commitment = {
  id: string; wording: string; meeting: string; date: string; context: string;
  owner: string; proposedOwner?: string; due: string; status: Status; reminder: string;
  events: EventItem[]; reason?: string; transferMode?: 'candidate' | 'active'; linkedFrom?: string;
  description?: string; documents?: SupportingDocument[]; documentLinks?: string[];
  priority?: Priority; completionCriteria?: string; notes?: string; manual?: boolean;
};
const STORAGE_KEY = 'fireflies-commitments-demo-v1';
const THEME_STORAGE_KEY = 'fireflies-theme-preference-v1';
const VIEWER = 'Kirankumar S';
const TEAM = ['Kirankumar S', 'Maya Chen', 'Jordan Lee', 'Priya Nair', 'Alex Morgan'];
const ACCEPTED_DOCUMENT_EXTENSIONS = ['.pdf', '.docx', '.xlsx', '.txt'];
const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
const nowLabel = () => new Date().toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
const event = (label: string): EventItem => ({ label, at: nowLabel() });
const displayFileSize = (bytes: number) => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
const seed: Commitment[] = [
  { id:'c-101', wording:'Share the revised onboarding flow with the design team', meeting:'Product weekly — onboarding review', date:'Oct 28, 2026', context:'“I can take the revised onboarding flow, clean up the first-run screens, and share it with design before our next review.”', owner:VIEWER, proposedOwner:VIEWER, due:'Nov 4, 2026', status:'candidate', reminder:'Simulated follow-up: waiting for owner confirmation', events:[{label:'Candidate extracted from meeting notes',at:'Oct 28, 2026 · 10:14 AM'}] },
  { id:'c-102', wording:'Send the updated Q4 launch checklist to the group', meeting:'RPO Recruitment Coordination and Tracking', date:'Oct 27, 2026', context:'“I’ll update the launch checklist with the latest dates and send it around after this call.”', owner:'Maya Chen', proposedOwner:'Maya Chen', due:'Nov 3, 2026', status:'candidate', reminder:'Simulated follow-up: waiting for owner confirmation', events:[{label:'Candidate extracted from meeting notes',at:'Oct 27, 2026 · 3:15 PM'}] },
  { id:'c-103', wording:'Check available ITC career openings and share relevant roles', meeting:'Career planning check-in', date:'Oct 26, 2026', context:'“I’ll look through the ITC openings and send over a few that match the Java and recruiting roles we discussed.”', owner:VIEWER, due:'Nov 2, 2026', status:'open', reminder:'Simulated follow-up is on · no notification sent', events:[{label:'Confirmed by Kirankumar S',at:'Oct 26, 2026 · 2:32 PM'}] },
  { id:'c-104', wording:'Confirm the data export fields with analytics', meeting:'Reporting roadmap sync', date:'Oct 25, 2026', context:'“I can confirm those export fields once we hear back from the analytics team.”', owner:'Jordan Lee', due:'Nov 1, 2026', status:'blocked', reminder:'Paused while blocked · no notification sent', reason:'Waiting on analytics to confirm the final field list.', events:[{label:'Confirmed by Jordan Lee',at:'Oct 25, 2026 · 11:05 AM'},{label:'Marked blocked: waiting on analytics',at:'Oct 28, 2026 · 9:42 AM'}] },
  { id:'c-105', wording:'Draft the customer interview guide for the November study', meeting:'Research planning', date:'Oct 24, 2026', context:'“Could someone take the first draft of the interview guide? I can review it next week.”', owner:'Maya Chen', proposedOwner:VIEWER, due:'Nov 6, 2026', status:'pending', reminder:'Follow-up paused during transfer · no notification sent', transferMode:'active', events:[{label:'Reassignment requested by Maya Chen',at:'Oct 28, 2026 · 1:18 PM'}] },
  { id:'c-106', wording:'Send the meeting notes to the product channel', meeting:'Product weekly', date:'Oct 23, 2026', context:'“I’ll post the notes and open questions in the product channel after we wrap.”', owner:'Alex Morgan', due:'Oct 29, 2026', status:'done', reminder:'Stopped after completion', events:[{label:'Marked done by Alex Morgan',at:'Oct 27, 2026 · 4:09 PM'}] },
  { id:'c-107', wording:'Explore a second vendor option for the pilot', meeting:'Pilot planning', date:'Oct 22, 2026', context:'“We can let the vendor search go for now; the current option covers what we need.”', owner:'Maya Chen', due:'Nov 5, 2026', status:'dropped', reminder:'Stopped after deliberate drop', reason:'No longer needed; the selected vendor covers the pilot.', events:[{label:'Deliberately dropped by Maya Chen',at:'Oct 27, 2026 · 11:24 AM'}] },
  { id:'c-108', wording:'Prepare a pricing comparison for the partner review', meeting:'Partner planning call', date:'Oct 21, 2026', context:'“I don’t think we agreed to prepare a pricing comparison this week.”', owner:'Jordan Lee', due:'Nov 2, 2026', status:'declined', reminder:'Stopped after candidate declined', reason:'Not a commitment agreed in this meeting.', events:[{label:'Declined by Jordan Lee',at:'Oct 22, 2026 · 9:03 AM'}] },
];
const statusInfo: Record<Status, {label:string; klass:string}> = {
  candidate:{label:'Candidate · confirm owner',klass:'candidate'}, open:{label:'Open',klass:''},
  blocked:{label:'Blocked · unresolved',klass:'blocked'}, pending:{label:'Awaiting acceptance',klass:'pending'},
  done:{label:'Done',klass:'resolved'}, reassigned:{label:'Reassigned',klass:'resolved'}, dropped:{label:'Deliberately dropped',klass:'resolved'},
  declined:{label:'Declined',klass:'declined'},
};
const isResolved = (s: Status) => s === 'done' || s === 'reassigned' || s === 'dropped';
const isActive = (s: Status) => s === 'candidate' || s === 'open' || s === 'blocked' || s === 'pending';
const nextAction = (task: Commitment) => {
  if (task.status === 'candidate') return 'Confirm an owner';
  if (task.status === 'pending') return task.proposedOwner === VIEWER ? 'Accept or decline request' : `Waiting for ${task.proposedOwner || 'recipient'}`;
  if (task.status === 'blocked') return 'Resolve dependency';
  if (task.status === 'open') return !task.owner ? 'Assign or complete' : task.owner === VIEWER ? 'Complete or update' : `Waiting on ${task.owner}`;
  if (task.status === 'done') return 'Completed';
  if (task.status === 'reassigned') return 'Previous instance closed';
  if (task.status === 'dropped') return 'No further action';
  return 'Candidate declined';
};

function readDemo(): Commitment[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return seed;
    const stored = JSON.parse(value) as Commitment[];
    return stored.map(task => task.id === 'c-105' && task.status === 'pending' && task.transferMode === 'active'
      ? {...task,owner:'Maya Chen',proposedOwner:VIEWER,events:[{label:'Reassignment requested by Maya Chen',at:'Oct 28, 2026 · 1:18 PM'},...task.events.slice(1)]}
      : task);
  }
  catch { return seed; }
}
function readThemePreference(): ThemePreference {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
  } catch { return 'system'; }
}
function Shell({ children, search, onSearch, onNotice, themePreference, onThemePreferenceChange }: { children: ReactNode; search: string; onSearch: (value:string)=>void; onNotice:(message:string)=>void; themePreference:ThemePreference; onThemePreferenceChange:(value:ThemePreference)=>void }) {
  const [path] = useLocation();
  const unavailable = (section:string) => onNotice(`${section} is outside this prototype. The demo focuses on Tasks.`);
  const navButton = (label:string, Icon:typeof Home) => <button type="button" className="nav-link nav-unsupported" key={label} onClick={()=>unavailable(label)} title={`${label} · not included in prototype`} data-testid={`nav-unsupported-${label.toLowerCase().replaceAll(' ','-')}`}><Icon size={14}/><span>{label}</span></button>;
  return <div className="app-frame">
    <div className="trial-strip">You have 2 days left in your business plan free trial. <strong>Subscribe now →</strong></div>
    <div className="shell">
      <aside className="sidebar">
        <Link href="/" className="brand-row" aria-label="Fireflies home" data-testid="link-fireflies-home"><span className="brand-mark">F</span><span>Kirankumar</span><ChevronDown size={12} className="brand-caret"/></Link>
        <nav className="side-nav" aria-label="Main navigation">
          <Link href="/" className={`nav-link ${path === '/' ? 'active' : ''}`} data-testid="link-home"><Home size={14}/><span>Home</span></Link>
          {navButton('AskFred',MessagesSquare)}
          {navButton('Meetings',Video)}
          <Link href="/tasks" className={`nav-link ${path === '/tasks' ? 'active' : ''}`} data-testid="link-tasks"><ListChecks size={14}/><span>Tasks</span></Link>
          {navButton('AI Skills',Sparkles)}
          {navButton('Analytics',BarChart3)}
          {navButton('Voice Agents',Bot)}
          {navButton('Upgrade',Zap)}
          <div className="nav-divider" aria-hidden="true"/>
          {navButton('Integrations',Plug)}
          {navButton('Settings',Settings)}
          <div className="nav-divider" aria-hidden="true"/>
          <Link href="/project-notes" className={`nav-link ${path === '/project-notes' ? 'active' : ''}`} data-testid="link-project-notes"><FileText size={14}/><span>Project notes</span></Link>
        </nav>
        <div className="side-bottom">Fireflies Tasks<br/>Commitments prototype<br/><span>Synthetic sample data</span></div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <span className="top-title">{path === '/' ? 'Home' : path === '/project-notes' ? 'Project notes' : 'Tasks'}</span>
          <div className="global-search"><Search size={13}/><input value={search} onChange={e=>onSearch(e.target.value)} aria-label={path === '/' ? 'Search meetings' : 'Search tasks'} placeholder={path === '/' ? 'Search meetings' : 'Search by title or keyword'} data-testid="input-global-search" /></div>
          <span className="top-spacer"/>
          <label className="theme-control"><span className="sr-only">Theme</span><select value={themePreference} onChange={e=>onThemePreferenceChange(e.target.value as ThemePreference)} aria-label="Theme" data-testid="select-theme"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
          <span className="icon-button" title="Follow-up is simulated only" aria-label="Follow-up is simulated only"><Bell size={15}/></span>
          <span className="invite-chip">KS&nbsp; +1 &nbsp; Invite</span>
        </header>
        {children}
      </main>
    </div>
  </div>;
}

function App() {
  const [tasks, setTasks] = useState<Commitment[]>(readDemo);
  const [view, setView] = useState<'mine'|'all'>('mine');
  const [statusFilter, setStatusFilter] = useState('active');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState<{kind:string; id?:string} | null>(null);
  const [formText, setFormText] = useState('');
  const [formOwner, setFormOwner] = useState('');
  const [formReason, setFormReason] = useState('');
  const [draftDue, setDraftDue] = useState('');
  const [createTitle, setCreateTitle] = useState('');
  const [createDescription, setCreateDescription] = useState('');
  const [createFiles, setCreateFiles] = useState<File[]>([]);
  const [createLinks, setCreateLinks] = useState<string[]>([]);
  const [createLinkDraft, setCreateLinkDraft] = useState('');
  const [createLinkError, setCreateLinkError] = useState('');
  const [createFileError, setCreateFileError] = useState('');
  const [createError, setCreateError] = useState('');
  const [createAssignee, setCreateAssignee] = useState('');
  const [createDue, setCreateDue] = useState('');
  const [createPriority, setCreatePriority] = useState<Priority>('medium');
  const [createMeeting, setCreateMeeting] = useState('');
  const [createCriteria, setCreateCriteria] = useState('');
  const [createNotes, setCreateNotes] = useState('');
  const [themePreference, setThemePreference] = useState<ThemePreference>(readThemePreference);
  const [systemTheme, setSystemTheme] = useState<'light'|'dark'>(() => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(''), 3200); return () => window.clearTimeout(t); }, [toast]);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemThemeChange = () => setSystemTheme(mediaQuery.matches ? 'light' : 'dark');
    mediaQuery.addEventListener?.('change', onSystemThemeChange);
    return () => mediaQuery.removeEventListener?.('change', onSystemThemeChange);
  }, []);
  useEffect(() => {
    const effectiveTheme = themePreference === 'system' ? systemTheme : themePreference;
    document.documentElement.dataset.theme = effectiveTheme;
    document.documentElement.style.colorScheme = effectiveTheme;
    localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [themePreference, systemTheme]);
  const update = (id:string, patch:Partial<Commitment>, label:string) => {
    setTasks(current => current.map(task => task.id === id ? {...task,...patch,events:[event(label),...task.events]} : task));
    setToast(label);
  };
  const selectedTask = modal?.id ? tasks.find(task => task.id === modal.id) : undefined;
  const createDirty = Boolean(createTitle.trim() || createDescription.trim() || createFiles.length || createLinks.length || createLinkDraft.trim() || createAssignee || createDue || createMeeting || createCriteria.trim() || createNotes.trim() || createPriority !== 'medium');
  const resetCreateForm = (meeting = '') => {
    setCreateTitle(''); setCreateDescription(''); setCreateFiles([]); setCreateLinks([]); setCreateLinkDraft('');
    setCreateLinkError(''); setCreateFileError(''); setCreateError(''); setCreateAssignee(''); setCreateDue('');
    setCreatePriority('medium'); setCreateMeeting(meeting); setCreateCriteria(''); setCreateNotes('');
  };
  const closeModal = () => {
    if (modal?.kind === 'create' && createDirty && !window.confirm('Discard this unfinished task?')) return;
    setModal(null);
  };
  const openCreateTask = (meeting = '') => { resetCreateForm(meeting); setModal({kind:'create'}); };
  const openModal = (kind:string, task?:Commitment) => {
    setModal({kind,id:task?.id});
    setFormText(task?.wording ?? '');
    setFormOwner(task?.proposedOwner && task.proposedOwner !== task.owner ? task.proposedOwner : '');
    setFormReason(task?.reason ?? '');
    setDraftDue(task?.due ?? '');
  };
  const addCreateFiles = (incoming: File[]) => {
    setCreateFileError('');
    const invalid = incoming.find(file => {
      const lowerName = file.name.toLowerCase();
      return !ACCEPTED_DOCUMENT_EXTENSIONS.some(extension => lowerName.endsWith(extension)) || file.size > MAX_DOCUMENT_SIZE;
    });
    if (invalid) {
      const lowerName = invalid.name.toLowerCase();
      setCreateFileError(!ACCEPTED_DOCUMENT_EXTENSIONS.some(extension => lowerName.endsWith(extension))
        ? `${invalid.name} is not supported. Use PDF, DOCX, XLSX, or TXT.`
        : `${invalid.name} is larger than the 10 MB limit.`);
      return;
    }
    setCreateFiles(current => [...current, ...incoming.filter(file => !current.some(existing => existing.name === file.name && existing.size === file.size))]);
  };
  const addCreateLink = () => {
    const value = createLinkDraft.trim();
    if (!value) return;
    try {
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error('protocol');
    } catch {
      setCreateLinkError('Enter a valid http:// or https:// document URL.');
      return;
    }
    if (createLinks.includes(value)) { setCreateLinkError('That document link has already been added.'); return; }
    setCreateLinks(current => [...current, value]); setCreateLinkDraft(''); setCreateLinkError('');
  };
  const createTask = () => {
    const title = createTitle.trim();
    if (!title) { setCreateError('Add a task title before creating the task.'); return; }
    if (createLinkDraft.trim()) { setCreateLinkError('Select Add link to validate and add this URL.'); return; }
    const assignedTo = createAssignee.trim();
    const waitingForAcceptance = Boolean(assignedTo && assignedTo !== VIEWER);
    const task: Commitment = {
      id:`manual-${Date.now()}`, wording:title, meeting:createMeeting || 'Manual tasks', date:new Date().toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}),
      context:createDescription.trim() || 'Manual task created in this prototype.', owner:waitingForAcceptance ? VIEWER : assignedTo,
      proposedOwner:waitingForAcceptance ? assignedTo : undefined, due:createDue ? new Date(`${createDue}T00:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}) : 'No due date',
      status:waitingForAcceptance ? 'pending' : 'open', reminder:waitingForAcceptance ? 'Follow-up paused during transfer · no notification sent' : 'Simulated follow-up is on · no notification sent',
      transferMode:waitingForAcceptance ? 'active' : undefined, events:[event('Created manually')],
      description:createDescription.trim() || undefined, documents:createFiles.map(file=>({name:file.name,type:file.type || file.name.split('.').pop()?.toUpperCase() || 'Document',size:file.size})),
      documentLinks:createLinks, priority:createPriority, completionCriteria:createCriteria.trim() || undefined, notes:createNotes.trim() || undefined, manual:true,
    };
    setTasks(current => [task, ...current]); setToast('Task created · supporting documents remain local metadata only'); resetCreateForm(); setModal(null);
  };
  const candidates = tasks.filter(task => task.status === 'candidate');
  const filtered = useMemo(() => tasks.filter(task => {
    const visibleToMe = view === 'all' || !task.owner || task.owner === VIEWER || task.proposedOwner === VIEWER;
    const matchesFilter = statusFilter === 'all' ||
      (statusFilter === 'active' && isActive(task.status)) ||
      (statusFilter === 'candidates' && task.status === 'candidate') ||
      (statusFilter === 'unresolved' && ['open','blocked','pending'].includes(task.status)) ||
      (statusFilter === 'resolved' && isResolved(task.status)) ||
      (statusFilter === 'declined' && task.status === 'declined');
    const needle = search.trim().toLowerCase();
    const matchesSearch = !needle || [task.wording,task.meeting,task.owner,task.proposedOwner,task.status].join(' ').toLowerCase().includes(needle);
    return visibleToMe && matchesFilter && matchesSearch;
  }), [tasks,view,statusFilter,search]);

  const confirmCandidate = (task:Commitment) => update(task.id,{status:'open',owner:task.owner,proposedOwner:undefined,reminder:'Simulated follow-up is on · no notification sent'},`${task.owner} confirmed this commitment`);
  const acceptTransfer = (task:Commitment) => {
    if (task.transferMode === 'candidate') {
      update(task.id,{status:'open',owner:task.proposedOwner || task.owner,proposedOwner:undefined,transferMode:undefined,reminder:'Simulated follow-up is on · no notification sent'},`${task.proposedOwner} accepted ownership`);
    } else {
      const newOwner = task.proposedOwner || task.owner;
      const newId = `${task.id}-transfer-${Date.now().toString().slice(-5)}`;
      const newInstance: Commitment = {...task,id:newId,owner:newOwner,proposedOwner:undefined,status:'open',transferMode:undefined,linkedFrom:task.id,reminder:'Simulated follow-up is on · no notification sent',events:[event(`Accepted by ${newOwner}; linked open instance`)]};
       setTasks(current => [...current.map(item => item.id === task.id ? {...item,status:'reassigned' as Status,reason:`Reassigned to ${newOwner}`,reminder:'Stopped after accepted transfer',events:[event(`Transfer accepted by ${newOwner}; follow-up stopped`),...item.events]} : item),newInstance]);
      setToast(`Transfer accepted. ${newOwner} now owns the linked commitment.`);
    }
    setModal(null);
  };
  const declineTransfer = (task:Commitment) => {
    const proposedOwner = task.proposedOwner;
    if (task.transferMode === 'candidate') update(task.id,{status:'candidate',proposedOwner:undefined,transferMode:undefined},`${proposedOwner} declined; candidate returned for review`);
    else update(task.id,{status:'open',proposedOwner:undefined,transferMode:undefined,reminder:'Simulated follow-up is on · no notification sent'},`${proposedOwner} declined; ownership remains with ${task.owner}`);
    setModal(null);
  };
  const runModalAction = () => {
    if (!selectedTask) return;
    const task = selectedTask;
    if (modal?.kind === 'edit') {
      if (!formText.trim()) { setToast('Add commitment wording before saving.'); return; }
      update(task.id,{wording:formText.trim(),due:draftDue},'Commitment wording updated'); setModal(null);
    } else if (modal?.kind === 'suggest' || modal?.kind === 'reassign') {
      if (!formOwner || formOwner === task.owner) { setToast('Choose another person to continue.'); return; }
      update(task.id,{status:'pending',proposedOwner:formOwner,transferMode:modal.kind === 'suggest' ? 'candidate' : 'active',reminder:'Follow-up paused during transfer · no notification sent'},`Ownership suggested to ${formOwner}; awaiting their acceptance`); setModal(null);
    } else if (modal?.kind === 'decline') {
      update(task.id,{status:'declined',reason:formReason.trim() || undefined,reminder:'Stopped after candidate declined'},'Candidate declined · follow-up stopped'); setModal(null);
    } else if (modal?.kind === 'blocked') {
      if (!formReason.trim()) { setToast('Add the dependency that is blocking progress.'); return; }
      update(task.id,{status:'blocked',reason:formReason.trim(),reminder:'Paused while blocked · no notification sent'},'Marked blocked · remains unresolved'); setModal(null);
    } else if (modal?.kind === 'drop') {
      update(task.id,{status:'dropped',reason:formReason.trim() || undefined,reminder:'Stopped after deliberate drop'},'Deliberately dropped · follow-up stopped'); setModal(null);
    }
  };
  const reset = () => {
    if (window.confirm('Reset all local demo changes and restore the synthetic sample set?')) {
      setTasks(seed); setSearch(''); setStatusFilter('active'); setView('mine'); setToast('Demo reset to the original synthetic sample set.');
    }
  };
  const grouped = useMemo(() => {
    const groups = new Map<string,Commitment[]>();
    filtered.forEach(item => groups.set(item.meeting, [...(groups.get(item.meeting) || []),item]));
    return [...groups.entries()];
  },[filtered]);
  return <Shell search={search} onSearch={setSearch} onNotice={setToast} themePreference={themePreference} onThemePreferenceChange={setThemePreference}>
    <Switch>
      <Route path="/tasks">
        <div className="page-wrap">
          <div className="page-heading">
            <div><h1>Tasks</h1><p>Commitments stay candidates until a person confirms ownership.</p></div>
            <div className="heading-actions">
              <button className="button primary" onClick={()=>openCreateTask()} data-testid="button-add-task"><Plus size={13}/> Add Task</button>
              <button className="button quiet" onClick={reset} data-testid="button-reset-demo"><RotateCcw size={13}/> Reset demo</button>
              <button className="button primary" onClick={()=>openModal('review')} data-testid="button-review-candidates"><Sparkles size={13}/> Review candidates <span>{candidates.length}</span></button>
            </div>
          </div>
          <div className="subtle-banner"><span className="banner-mark"><ShieldCheck size={14}/></span><span><strong>Meeting commitments</strong> · confirm the person, not just the phrase. Follow-up shown here is simulated only.</span><Link className="banner-link" href="/project-notes" data-testid="link-how-it-works">How this prototype works →</Link></div>
          <div className="task-toolbar">
            <div className="segmented" role="tablist" aria-label="Task scope">
              <button className={`segment ${view==='mine'?'selected':''}`} onClick={()=>setView('mine')} data-testid="tab-my-tasks">My Tasks</button>
              <button className={`segment ${view==='all'?'selected':''}`} onClick={()=>setView('all')} data-testid="tab-all-tasks">All Tasks</button>
            </div>
            <div className="filter-tools">
              <select className="select-control" aria-label="Filter task status" value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} data-testid="select-status-filter">
                <option value="active">Active &amp; unresolved</option><option value="candidates">Candidates</option><option value="unresolved">Open / blocked / transfer</option><option value="resolved">Resolved outcomes</option><option value="declined">Declined candidates</option><option value="all">All statuses</option>
              </select>
              <div className="global-search"><Search size={13}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a task" aria-label="Find a task" data-testid="input-task-search"/></div>
            </div>
          </div>
          {filtered.length ? <div className="task-groups">
            {grouped.map(([meeting,items])=><section className="task-group" key={meeting} data-testid={`group-meeting-${items[0].id}`}>
              <div className="group-head"><span className="meeting-icon"><Activity size={15}/></span><div className="group-meta"><div className="group-title">{meeting}</div><div className="group-date">{items[0].date} · meeting notes</div></div><span className="group-count">{items.length} {items.length===1?'task':'tasks'}</span><button className="row-more" title="Meeting actions" onClick={()=>{setSearch(meeting);setToast('Showing tasks from this meeting.')}} data-testid={`button-meeting-filter-${items[0].id}`}><MoreHorizontal size={17}/></button></div>
              <div className="task-list">{items.map(task=><TaskRow key={task.id} task={task} onOpen={()=>openModal('inspect',task)} onAction={openModal} onDone={()=>update(task.id,{status:'done',reminder:'Stopped after completion'},'Marked done · follow-up stopped')} onUnblock={()=>update(task.id,{status:'open',reason:undefined,reminder:'Simulated follow-up is on · no notification sent'},'Unblocked · returned to open')} onAccept={()=>acceptTransfer(task)} onDeclineTransfer={()=>declineTransfer(task)} />)}</div>
              <button className="new-task" onClick={()=>openCreateTask(meeting)} data-testid={`button-new-task-${items[0].id}`}><Plus size={15}/> Add Task</button>
            </section>)}
          </div> : <div className="empty-state"><ListChecks size={21}/><strong>{search ? 'No matching commitments' : 'Nothing in this view yet'}</strong><p>{search ? 'Try another title, owner, or meeting keyword.' : 'Change the status filter or switch to All Tasks to see more of the synthetic sample.'}</p><button className="button" onClick={()=>{setSearch('');setStatusFilter('all');setView('all');}} data-testid="button-show-all">Show all sample tasks</button></div>}
          <p className="synthetic-note">Synthetic examples for demonstration only · no live meeting data or notifications.</p>
        </div>
      </Route>
      <Route path="/">
        <HomePage tasks={tasks} search={search} onSearch={setSearch}/>
      </Route>
      <Route path="/project-notes">
        <ProjectNotes/>
      </Route>
      <Route><NotFound/></Route>
    </Switch>
    {modal && <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)closeModal();}}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-head"><h2 id="modal-title">{modal.kind==='create'?'Add task':modal.kind==='inspect'?'Commitment details':modal.kind==='review'?'Review meeting candidates':modal.kind==='edit'?'Edit commitment':modal.kind==='suggest'?'Suggest another owner':modal.kind==='reassign'?'Request reassignment':modal.kind==='decline'?'Decline candidate':modal.kind==='blocked'?'Mark as blocked':'Deliberately drop'}</h2><button className="icon-button" onClick={closeModal} aria-label="Close dialog" data-testid="button-close-modal"><X size={16}/></button></div>
        {modal.kind==='create' ? <form className="create-form" onSubmit={e=>{e.preventDefault();createTask();}}>
          <div className="modal-content">
            <p className="create-intro">Create a local prototype task. Attachments are kept as metadata only; no files are uploaded or synchronized.</p>
            <fieldset className="create-section"><legend>Task details</legend>
              <div className="form-field"><label htmlFor="create-title">Task title <span className="required-mark">Required</span></label><input id="create-title" value={createTitle} onChange={e=>{setCreateTitle(e.target.value);setCreateError('');}} placeholder="What needs to be done?" autoFocus data-testid="input-create-title"/>{createError&&<p className="field-error" role="alert">{createError}</p>}</div>
              <div className="form-field"><label htmlFor="create-description">Description / task details <span className="field-optional">Optional</span></label><textarea id="create-description" value={createDescription} onChange={e=>setCreateDescription(e.target.value)} placeholder="Add instructions, context, dependencies, or expected deliverables." data-testid="input-create-description"/></div>
              <div className="form-field"><label htmlFor="create-criteria">What does done look like? <span className="field-optional">Optional</span></label><input id="create-criteria" value={createCriteria} onChange={e=>setCreateCriteria(e.target.value)} placeholder="Describe the expected outcome" data-testid="input-create-criteria"/></div>
              <div className="form-field"><label htmlFor="create-notes">Additional notes <span className="field-optional">Optional</span></label><textarea id="create-notes" value={createNotes} onChange={e=>setCreateNotes(e.target.value)} placeholder="Anything else to keep in mind" data-testid="input-create-notes"/></div>
            </fieldset>
            <fieldset className="create-section"><legend>Ownership and scheduling</legend>
              <div className="create-field-grid"><div className="form-field"><label htmlFor="create-assignee">Assignee <span className="field-optional">Optional</span></label><select id="create-assignee" value={createAssignee} onChange={e=>setCreateAssignee(e.target.value)} data-testid="select-create-assignee"><option value="">Unassigned</option>{TEAM.map(name=><option key={name} value={name}>{name}{name===VIEWER?' (you)':''}</option>)}</select></div><div className="form-field"><label htmlFor="create-due">Due date <span className="field-optional">Optional</span></label><input id="create-due" type="date" value={createDue} onChange={e=>setCreateDue(e.target.value)} data-testid="input-create-due"/></div></div>
              <div className="create-field-grid"><div className="form-field"><label htmlFor="create-priority">Priority</label><select id="create-priority" value={createPriority} onChange={e=>setCreatePriority(e.target.value as Priority)} data-testid="select-create-priority"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div><div className="form-field"><label htmlFor="create-meeting">Related meeting <span className="field-optional">Optional</span></label><select id="create-meeting" value={createMeeting} onChange={e=>setCreateMeeting(e.target.value)} data-testid="select-create-meeting"><option value="">No related meeting</option>{[...new Set(tasks.map(task=>task.meeting))].map(meeting=><option key={meeting} value={meeting}>{meeting}</option>)}</select></div></div>
              {createAssignee && createAssignee!==VIEWER && <p className="context-caption">This creates an awaiting-acceptance transfer. {createAssignee} is proposed, not confirmed, until they accept.</p>}
            </fieldset>
            <fieldset className="create-section"><legend>Supporting documents</legend>
              <div className="file-dropzone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();addCreateFiles([...e.dataTransfer.files]);}}><Upload size={16}/><div><strong>Drop documents here</strong><span>PDF, DOCX, XLSX, or TXT · up to 10 MB each</span></div><label className="button small"><input type="file" multiple accept=".pdf,.docx,.xlsx,.txt" onChange={e=>addCreateFiles(e.target.files ? [...e.target.files] : [])} data-testid="input-create-files"/>Choose files</label></div>
              {createFileError&&<p className="field-error" role="alert">{createFileError}</p>}
              {!!createFiles.length&&<ul className="attachment-list">{createFiles.map((file,index)=><li key={`${file.name}-${file.size}-${index}`}><FileText size={14}/><span><strong title={file.name}>{file.name}</strong><small>{file.type || file.name.split('.').pop()?.toUpperCase() || 'Document'} · {displayFileSize(file.size)}</small></span><button type="button" className="attachment-remove" onClick={()=>setCreateFiles(current=>current.filter((_,fileIndex)=>fileIndex!==index))} aria-label={`Remove ${file.name}`} data-testid={`button-remove-file-${index}`}><X size={14}/></button></li>)}</ul>}
              <div className="form-field link-field"><label htmlFor="create-link">Document links <span className="field-optional">Optional</span></label><div className="link-entry"><input id="create-link" type="url" value={createLinkDraft} onChange={e=>{setCreateLinkDraft(e.target.value);setCreateLinkError('');}} placeholder="https://drive.google.com/..." data-testid="input-create-link"/><button type="button" className="button small" onClick={addCreateLink} data-testid="button-add-link">Add link</button></div>{createLinkError&&<p className="field-error" role="alert">{createLinkError}</p>}</div>
              {!!createLinks.length&&<ul className="document-link-list">{createLinks.map((link,index)=><li key={link}><a href={link} target="_blank" rel="noreferrer" title={link}>{link}</a><button type="button" className="attachment-remove" onClick={()=>setCreateLinks(current=>current.filter((_,linkIndex)=>linkIndex!==index))} aria-label={`Remove document link ${index+1}`} data-testid={`button-remove-link-${index}`}><X size={14}/></button></li>)}</ul>}
            </fieldset>
          </div>
          <div className="modal-foot"><button type="button" className="button" onClick={closeModal} data-testid="button-create-cancel">Cancel</button><button type="submit" className="button primary" data-testid="button-create-task"><Plus size={14}/> Create Task</button></div>
        </form> : <>
        <div className="modal-content">
          {modal.kind==='review' ? <ReviewCandidates tasks={candidates} onInspect={task=>openModal('inspect',task)}/> :
          selectedTask && modal.kind==='inspect' ? <>
            <div className="task-wording detail-wording" data-testid={`text-detail-wording-${selectedTask.id}`}>{selectedTask.wording}</div>
            <div className="task-subline"><span>{selectedTask.meeting}</span><span>·</span><span>{selectedTask.date}</span></div>
            <div className="detail-summary"><div><span className="detail-label">Current owner</span><strong>{selectedTask.owner || 'Unassigned'}</strong></div><div><span className="detail-label">Next action</span><strong>{nextAction(selectedTask)}</strong></div><div><span className="detail-label">Due</span><strong>{selectedTask.due}</strong></div></div>
            <div className="context-box"><blockquote>{selectedTask.context}</blockquote><div className="context-caption">Meeting context · synthetic excerpt</div></div>
            {(selectedTask.priority || selectedTask.completionCriteria || selectedTask.notes || selectedTask.documents?.length || selectedTask.documentLinks?.length) && <div className="detail-extra-grid">
              {selectedTask.priority && <div><span className="detail-label">Priority</span><strong className="priority-value">{selectedTask.priority}</strong></div>}
              {selectedTask.completionCriteria && <div className="detail-extra-wide"><span className="detail-label">What does done look like?</span><strong>{selectedTask.completionCriteria}</strong></div>}
              {selectedTask.notes && <div className="detail-extra-wide"><span className="detail-label">Additional notes</span><strong>{selectedTask.notes}</strong></div>}
              {!!selectedTask.documents?.length && <div className="detail-extra-wide"><span className="detail-label">Supporting documents</span><div className="detail-document-list">{selectedTask.documents.map(document=><span key={`${document.name}-${document.size}`} title={document.name}><FileText size={13}/>{document.name} <small>{displayFileSize(document.size)}</small></span>)}</div></div>}
              {!!selectedTask.documentLinks?.length && <div className="detail-extra-wide"><span className="detail-label">Document links</span><div className="detail-document-list">{selectedTask.documentLinks.map(link=><a key={link} href={link} target="_blank" rel="noreferrer" title={link}>{link}</a>)}</div></div>}
            </div>}
            <div className="task-subline"><span className={`status-pill ${statusInfo[selectedTask.status].klass}`} data-testid={`status-detail-${selectedTask.id}`}>{statusInfo[selectedTask.status].label}</span></div>
            {selectedTask.proposedOwner && <div className="context-box"><strong>Awaiting {selectedTask.proposedOwner}</strong> to accept. The current owner remains unchanged until they do.</div>}
            {selectedTask.reason && <div className="context-box"><strong>Reason</strong><br/>{selectedTask.reason}</div>}
            <div className="context-caption">{selectedTask.reminder}</div>
            <div className="context-caption" style={{marginTop:16}}>Activity</div><ul className="event-list" data-testid={`list-history-${selectedTask.id}`}>{selectedTask.events.map((item,i)=><li key={`${item.at}-${i}`}>{item.label}<time>{item.at}</time></li>)}</ul>
          </> :
          <>
            {modal.kind==='edit' && <><div className="form-field"><label htmlFor="edit-phrase">Commitment wording</label><textarea id="edit-phrase" value={formText} onChange={e=>setFormText(e.target.value)} data-testid="input-edit-wording"/></div><div className="form-field"><label htmlFor="edit-due">Due date</label><input id="edit-due" value={draftDue} onChange={e=>setDraftDue(e.target.value)} data-testid="input-edit-due"/></div></>}
            {(modal.kind==='suggest'||modal.kind==='reassign') && <><p className="context-caption">The suggested person must accept before ownership changes. No message is sent from this demo.</p><div className="form-field"><label htmlFor="owner-select">Suggest owner</label><select id="owner-select" value={formOwner} onChange={e=>setFormOwner(e.target.value)} data-testid="select-proposed-owner"><option value="">Choose a teammate</option>{TEAM.filter(name=>name!==selectedTask?.owner).map(name=><option key={name} value={name}>{name}</option>)}</select></div></>}
            {(modal.kind==='decline'||modal.kind==='blocked'||modal.kind==='drop') && <div className="form-field"><label htmlFor="reason-field">{modal.kind==='blocked'?'What dependency is blocking progress?':modal.kind==='drop'?'Why is this no longer needed? (optional)':'Why was this not a commitment? (optional)'}</label><textarea id="reason-field" value={formReason} onChange={e=>setFormReason(e.target.value)} data-testid="input-action-reason"/></div>}
          </>}
        </div>
        <div className="modal-foot">
          <button className="button" onClick={closeModal} data-testid="button-modal-cancel">Close</button>
          {selectedTask && modal.kind==='inspect' && <InspectActions task={selectedTask} onAction={openModal} onConfirm={()=>{confirmCandidate(selectedTask);setModal(null);}} onDone={()=>{update(selectedTask.id,{status:'done',reminder:'Stopped after completion'},'Marked done · follow-up stopped');setModal(null);}} onUnblock={()=>{update(selectedTask.id,{status:'open',reason:undefined,reminder:'Simulated follow-up is on · no notification sent'},'Unblocked · returned to open');setModal(null);}} onAccept={()=>acceptTransfer(selectedTask)} onDeclineTransfer={()=>declineTransfer(selectedTask)} />}
          {modal.kind==='review' && <button className="button primary" onClick={()=>{if(candidates[0])openModal('inspect',candidates[0]);}} disabled={!candidates.length} data-testid="button-open-first-candidate">Inspect next candidate</button>}
          {['edit','suggest','reassign','decline','blocked','drop'].includes(modal.kind) && <button className={`button ${modal.kind==='drop'||modal.kind==='decline'?'danger':'primary'}`} onClick={runModalAction} data-testid={`button-confirm-${modal.kind}`}>{modal.kind==='edit'?'Save changes':modal.kind==='suggest'||modal.kind==='reassign'?'Request acceptance':modal.kind==='decline'?'Decline candidate':modal.kind==='blocked'?'Mark blocked':'Drop commitment'}</button>}
        </div>
        </>}
      </div>
    </div>}
    {toast && <div className="toast" role="status" data-testid="status-toast"><CheckCircle2 size={15}/>{toast}</div>}
  </Shell>;
}

function TaskRow({task,onOpen,onAction,onDone,onUnblock,onAccept,onDeclineTransfer}:{task:Commitment;onOpen:()=>void;onAction:(kind:string,task?:Commitment)=>void;onDone:()=>void;onUnblock:()=>void;onAccept:()=>void;onDeclineTransfer:()=>void}) {
  const [expanded,setExpanded]=useState(false);
  const canAccept = task.status==='pending' && Boolean(task.proposedOwner);
  const simulatedRecipient = canAccept && task.proposedOwner !== VIEWER;
  const ownerDisplay = task.owner || 'Unassigned';
  return <div className="task-row" data-testid={`row-commitment-${task.id}`}>
    <button className={`row-check ${task.status==='done'?'done':''}`} aria-label={task.status==='done'?'Completed':'Open details'} onClick={task.status==='done'?onOpen:task.status==='open'?onDone:onOpen} data-testid={`button-task-check-${task.id}`}>{task.status==='done'?<Check size={12}/>:null}</button>
    <div className="task-main">
      <div className="task-copy" onClick={onOpen} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter')onOpen();}} data-testid={`text-task-${task.id}`}>
        <div className="task-wording">{task.wording}</div>
      </div>
       <div className="task-subline"><span className={`status-pill ${statusInfo[task.status].klass}`} data-testid={`status-task-${task.id}`}>{statusInfo[task.status].label}</span><span className="task-next"><span className="next-label">Next</span>{nextAction(task)}</span><span data-testid={`text-due-${task.id}`}>Due {task.due}</span>{task.status==='blocked'&&<span className="blocked-reason">{task.reason}</span>}</div>
    </div>
    <div className="task-side">
      <span className={`owner-pill ${task.status==='pending' ? 'pending-owner' : ''}`} title={task.status==='pending' ? `Current owner: ${task.owner || 'Unassigned'}. Proposed owner: ${task.proposedOwner}` : `Current owner: ${ownerDisplay}`}><span className="owner-avatar">{task.owner ? task.owner.split(' ').map(s=>s[0]).join('').slice(0,2) : '—'}</span><span><small>{task.status==='pending' ? 'Proposed' : 'Owner'}</small>{task.status==='pending' && task.proposedOwner===VIEWER ? 'You' : task.status==='pending' ? task.proposedOwner?.split(' ')[0] : ownerDisplay.split(' ')[0]}</span></span>
      <div className="row-actions">
      {canAccept ? <><button className="button small success" onClick={onAccept} data-testid={`button-accept-transfer-${task.id}`}>{simulatedRecipient ? 'Simulate accept' : 'Accept'}</button><button className="button small" onClick={onDeclineTransfer} data-testid={`button-reject-transfer-${task.id}`}>{simulatedRecipient ? 'Simulate decline' : 'Decline'}</button></> :
      task.status==='candidate' ? <button className="button small primary" onClick={()=>onAction('inspect',task)} data-testid={`button-review-${task.id}`}>Review</button> :
      task.status==='pending'&&task.owner===VIEWER ? <button className="button small" onClick={()=>onAction('inspect',task)} data-testid={`button-view-transfer-${task.id}`}>View request</button> :
      task.status==='open'&&task.owner===VIEWER ? <><button className="button small success" onClick={onDone} data-testid={`button-done-${task.id}`}>Done</button><button className="button small" onClick={()=>setExpanded(!expanded)} data-testid={`button-more-actions-${task.id}`} aria-label="More task actions"><MoreHorizontal size={14}/></button></> :
      task.status==='blocked'&&task.owner===VIEWER ? <button className="button small" onClick={onUnblock} data-testid={`button-unblock-${task.id}`}>Unblock</button> :
      <button className="button small" onClick={onOpen} data-testid={`button-view-${task.id}`}>Details</button>}
      {task.status!=='open' && <button className="row-more" aria-label="More actions" onClick={()=>setExpanded(!expanded)} data-testid={`button-row-menu-${task.id}`}><MoreHorizontal size={16}/></button>}
      </div>
    </div>
    {expanded && <div className="row-overflow">
      <button className="button small" onClick={()=>onAction('inspect',task)} data-testid={`button-inspect-${task.id}`}>Inspect context</button>
      {task.status==='candidate'&&task.owner===VIEWER&&<><button className="button small primary" onClick={()=>onAction('edit',task)} data-testid={`button-edit-${task.id}`}>Edit wording</button><button className="button small" onClick={()=>onAction('suggest',task)} data-testid={`button-suggest-${task.id}`}>Suggest owner</button><button className="button small danger" onClick={()=>onAction('decline',task)} data-testid={`button-decline-${task.id}`}>Decline</button></>}
      {task.status==='open'&&task.owner===VIEWER&&<><button className="button small" onClick={()=>onAction('edit',task)} data-testid={`button-edit-${task.id}`}>Edit</button><button className="button small" onClick={()=>onAction('reassign',task)} data-testid={`button-reassign-${task.id}`}><ArrowLeftRight size={12}/> Reassign</button><button className="button small" onClick={()=>onAction('blocked',task)} data-testid={`button-block-${task.id}`}>Blocked</button><button className="button small danger" onClick={()=>onAction('drop',task)} data-testid={`button-drop-${task.id}`}>Drop</button></>}
      {task.status==='blocked'&&task.owner===VIEWER&&<><button className="button small" onClick={onUnblock} data-testid={`button-unblock-extra-${task.id}`}>Unblock</button><button className="button small" onClick={()=>onAction('reassign',task)} data-testid={`button-reassign-${task.id}`}><ArrowLeftRight size={12}/> Reassign</button></>}
    </div>}
  </div>;
}

function InspectActions({task,onAction,onConfirm,onDone,onUnblock,onAccept,onDeclineTransfer}:{task:Commitment;onAction:(kind:string,task?:Commitment)=>void;onConfirm:()=>void;onDone:()=>void;onUnblock:()=>void;onAccept:()=>void;onDeclineTransfer:()=>void}) {
  if(task.status==='candidate') return <><button className="button" onClick={()=>onAction('edit',task)} data-testid={`button-edit-detail-${task.id}`}>Edit wording</button><button className="button danger" onClick={()=>onAction('decline',task)} data-testid={`button-decline-detail-${task.id}`}>Decline</button><button className="button" onClick={()=>onAction('suggest',task)} data-testid={`button-suggest-detail-${task.id}`}>Suggest owner</button><button className="button primary" onClick={onConfirm} data-testid={`button-confirm-owner-${task.id}`}>Confirm owner</button></>;
  if(task.status==='pending'&&task.proposedOwner) return <><span className="context-caption">Recipient decision is simulated in this prototype; no message is sent.</span><button className="button" onClick={onDeclineTransfer} data-testid={`button-reject-detail-${task.id}`}>{task.proposedOwner===VIEWER?'Decline request':'Simulate recipient decline'}</button><button className="button primary" onClick={onAccept} data-testid={`button-accept-detail-${task.id}`}>{task.proposedOwner===VIEWER?'Accept ownership':'Simulate recipient acceptance'}</button></>;
  if(task.status==='pending') return <button className="button" onClick={()=>onAction('reassign',task)} data-testid={`button-view-pending-${task.id}`}>Review request</button>;
  if(task.status==='open'&&task.owner===VIEWER) return <><button className="button" onClick={()=>onAction('edit',task)} data-testid={`button-edit-detail-${task.id}`}>Edit</button><button className="button" onClick={()=>onAction('reassign',task)} data-testid={`button-reassign-detail-${task.id}`}>Request reassignment</button><button className="button" onClick={()=>onAction('blocked',task)} data-testid={`button-block-detail-${task.id}`}>Mark blocked</button><button className="button danger" onClick={()=>onAction('drop',task)} data-testid={`button-drop-detail-${task.id}`}>Drop</button><button className="button primary" onClick={onDone} data-testid={`button-done-detail-${task.id}`}>Mark Done</button></>;
  if(task.status==='blocked'&&task.owner===VIEWER) return <><button className="button" onClick={onUnblock} data-testid={`button-unblock-detail-${task.id}`}>Unblock</button><button className="button primary" onClick={onDone} data-testid={`button-done-detail-${task.id}`}>Mark Done</button></>;
  if(task.status==='declined') return <span className="context-caption">Candidate declined · follow-up stopped. This is not counted as a resolved commitment.</span>;
  return <span className="context-caption">{isResolved(task.status)?'Resolved outcome · follow-up stopped':'Only the active owner can change this commitment.'}</span>;
}

function ReviewCandidates({tasks,onInspect}:{tasks:Commitment[];onInspect:(task:Commitment)=>void}) {
  if(!tasks.length) return <div className="empty-state"><CheckCircle2 size={20}/><strong>All caught up</strong><p>No candidates are waiting for confirmation.</p></div>;
  return <div>{tasks.map(task=><div key={task.id} className="task-row"><span className="meeting-icon"><FileText size={14}/></span><div className="task-copy"><div className="task-wording">{task.wording}</div><div className="task-subline"><span>{task.meeting}</span><span>· Proposed owner {task.owner}</span></div></div><button className="button small primary" onClick={()=>onInspect(task)} data-testid={`button-inspect-candidate-${task.id}`}>Review</button></div>)}</div>;
}

function HomePage({tasks,search,onSearch}:{tasks:Commitment[];search:string;onSearch:(value:string)=>void}) {
  const outstanding = tasks.filter(task => isActive(task.status));
  const meetings = [...new Map(tasks.map(task => [task.meeting, task])).values()].slice(0, 4);
  const meetingCount = new Set(tasks.map(task => task.meeting)).size;
  return <div className="page-wrap home-page">
    <div className="home-hero">
      <div>
        <p className="eyebrow">Your Fireflies workspace</p>
        <h1>Good afternoon, Kirankumar</h1>
        <p className="hero-copy">Find a meeting, revisit its notes, or keep your commitments moving forward.</p>
      </div>
      <div className="home-hero-mark"><Activity size={22}/><span>Workspace overview</span></div>
    </div>
    <section className="home-search-card" aria-label="Search meetings">
      <div className="home-search-icon"><Search size={18}/></div>
      <div className="home-search-copy"><strong>Search your meetings</strong><span>Search is scoped to this prototype's synthetic meeting and commitment examples.</span></div>
      <div className="home-search-field"><Search size={14}/><input value={search} onChange={e=>onSearch(e.target.value)} aria-label="Search meetings" placeholder="Search by meeting or commitment" data-testid="input-home-search"/><Link className="button primary" href="/tasks" data-testid="link-home-search-tasks">Open Tasks</Link></div>
    </section>
    <div className="home-grid">
      <section className="home-panel recent-panel">
        <div className="panel-heading"><div><p className="eyebrow">Workspace activity</p><h2>Recent meetings</h2></div><span className="panel-count">{meetingCount} synthetic</span></div>
        <div className="meeting-list">{meetings.map(task=><div className="meeting-item" key={task.meeting}>
          <span className="meeting-item-icon"><Video size={15}/></span>
          <div className="meeting-item-copy"><strong>{task.meeting}</strong><span>{task.date} · {tasks.filter(item=>item.meeting===task.meeting).length} commitment{tasks.filter(item=>item.meeting===task.meeting).length===1?'':'s'}</span></div>
          <Link className="text-link" href="/project-notes" data-testid={`link-meeting-notes-${task.id}`}>Notes <span aria-hidden="true">→</span></Link>
        </div>)}</div>
        <Link className="panel-footer-link" href="/project-notes" data-testid="link-home-project-notes"><FileText size={14}/> Open meeting notes &amp; prototype context</Link>
      </section>
      <section className="home-panel commitment-panel">
        <div className="panel-heading"><div><p className="eyebrow">Follow-through</p><h2>Outstanding commitments</h2></div><span className="commitment-total">{outstanding.length}</span></div>
        <p className="panel-intro">Active and unresolved items from the current synthetic sample.</p>
        <div className="commitment-summary"><div><strong>{outstanding.filter(task=>task.status==='candidate').length}</strong><span>Need confirmation</span></div><div><strong>{outstanding.filter(task=>task.status==='blocked').length}</strong><span>Blocked</span></div><div><strong>{outstanding.filter(task=>task.status==='pending').length}</strong><span>Awaiting owner</span></div></div>
        <div className="commitment-preview">{outstanding.slice(0, 3).map(task=><Link className="commitment-item" href="/tasks" key={task.id} data-testid={`link-home-commitment-${task.id}`}><span className={`status-dot ${statusInfo[task.status].klass}`}/><span>{task.wording}</span><span className="commitment-due">{task.due}</span></Link>)}</div>
        <Link className="panel-footer-link" href="/tasks" data-testid="link-home-tasks"><ListChecks size={14}/> Manage commitments in Tasks</Link>
      </section>
    </div>
    <p className="synthetic-note">Synthetic examples for demonstration only · no live meeting data, integrations, or notifications.</p>
  </div>;
}

function ProjectNotes() {
  return <div className="page-wrap notes-page">
    <div className="page-heading"><div><h1>Project notes</h1><p>Reference analysis and acceptance checklist for the selected Step 3 direction.</p></div><a className="button primary" href="/mini-prd.docx" download data-testid="link-mini-prd"><FileText size={14}/> Download Mini PRD</a></div>
    <div className="subtle-banner"><span className="banner-mark"><ShieldCheck size={14}/></span><span><strong>Scope stays inside Tasks.</strong> An extracted phrase is a candidate until the owner confirms it. No live integrations are represented.</span></div>
    <section className="notes-card"><h2>Reference-image analysis</h2><p>The provided Fireflies screens establish a dark charcoal workspace, a narrow left rail, compact global search/header, subtle purple announcement strip, muted dividers, rounded task-group surfaces, and concise task rows. The prototype carries that hierarchy into the existing Tasks treatment: meeting title and date anchor each group; action rows retain clear owner, status, and timing; purple marks the primary confirmation action rather than decorating the whole interface.</p><div className="reference-grid">
      <div className="reference-item"><strong>Navigation &amp; header</strong><span>Persistent narrow workspace navigation, small account label, top search, notification and invite treatment.</span></div>
      <div className="reference-item"><strong>Tasks grouping</strong><span>Meeting-scoped card, compact title/date header, thin row dividers and owner chips.</span></div>
      <div className="reference-item"><strong>Visual language</strong><span>Charcoal surfaces, restrained purple active accents, low-contrast borders, small type and tight rhythm.</span></div>
      <div className="reference-item"><strong>Workflow additions</strong><span>Candidate confirmation, inspectable meeting excerpt, reasoned status transitions, recipient acceptance and simulated follow-up state.</span></div>
    </div></section>
    <section className="notes-card"><h2>Step 4 acceptance checklist</h2><ul className="checklist">
      <li>Tasks and Project notes routes have persistent navigation.</li><li>My Tasks / All Tasks, keyword search, status filter, meeting grouping, candidate review, and empty states work.</li><li>Candidate context can be inspected; owner can confirm, edit, decline with optional context, or suggest a different owner.</li><li>Suggested recipient acceptance is required before transfer; rejection returns to the existing owner/candidate flow.</li><li>Active owner can mark done, request reassignment, block with a reason, unblock, or deliberately drop with confirmation and an optional reason.</li><li>Blocked and pending states remain unresolved; accepted transfer marks the previous instance Reassigned, stops old-owner follow-up, and creates a linked open instance. Declined candidates are not resolved commitments.</li><li>Local demo state persists in localStorage; Reset demo restores synthetic examples. No notifications or backend calls are made.</li>
    </ul></section>
    <section className="notes-card"><h2>Assignment premises, not prototype outcomes</h2><div className="metric-premise"><div><strong>28%</strong><div>case-study baseline</div></div><div>→</div><div><strong>45%</strong><div>six-month target</div></div><p style={{marginLeft:'auto',maxWidth:350}}>Resolution within 14 days is the North Star case-study measure. These figures are assignment premises only; this prototype has no measured outcome.</p></div></section>
    <section className="notes-card"><h2>Assumptions to validate</h2><ul><li>Meeting excerpts and proposed owners are synthetic examples, not research findings.</li><li>Current user is shown as Kirankumar S; recipient acceptance is simulated in the same browser.</li><li>LocalStorage is a temporary demo state store; reminder language is in-product simulation only, not a sent notification.</li><li>Accepted reassignment marks the former owner instance Reassigned and creates a linked open instance for the accepting recipient; declined candidates remain separate from resolved commitments.</li><li>Eligibility start point and operational definition of the 14-day cohort need product and analytics review.</li></ul></section>
    <p className="synthetic-note">Prepared for the Fireflies Commitments capstone · Kirankumar S · Synthetic sample content</p>
  </div>;
}
function NotFound() {
  return <div className="page-wrap"><div className="empty-state"><CircleHelp size={20}/><strong>Page not found</strong><p>That route is not part of this prototype.</p><Link className="button" href="/" data-testid="link-return-home">Return home</Link></div></div>;
}

function Routed() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><App/></WouterRouter>;
}
export default Routed;
