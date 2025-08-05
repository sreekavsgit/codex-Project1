const { useState, useEffect } = React;

function Sidebar({ user, open }) {
  return (
    React.createElement('aside', {
      className: `${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed inset-y-0 left-0 w-64 bg-gray-900 text-gray-100 transform transition-transform duration-200 flex flex-col z-50`,
      'aria-label': 'Sidebar navigation'
    },
      React.createElement('div', { className: 'p-4 flex items-center space-x-3' },
        React.createElement('img', { src: user.avatar, alt: '', className: 'w-10 h-10 rounded-full' }),
        React.createElement('span', null, user.name)
      ),
      React.createElement('nav', { className: 'flex-1 px-4 space-y-2' },
        ['Dashboard', 'My Profile', 'Article Feed', 'Settings', 'Log Out'].map(text =>
          React.createElement('a', { href: '#', className: 'block py-2 px-3 rounded hover:bg-gray-700' }, text)
        )
      ),
      React.createElement('div', { className: 'p-4' },
        React.createElement('h3', { className: 'text-sm mb-2' }, 'Notifications'),
        React.createElement('div', { className: 'space-y-1' },
          ['New comment', 'New follower'].map((n, idx) =>
            React.createElement('span', { key: idx, className: 'block px-2 py-1 text-xs rounded-full bg-blue-600' }, n)
          )
        )
      )
    )
  );
}

function Header({ user, onMenu }) {
  return (
    React.createElement('header', { className: 'md:ml-64 p-4 bg-gray-800 flex items-center justify-between' },
      React.createElement('button', { className: 'md:hidden text-gray-200', onClick: onMenu, 'aria-label': 'Toggle menu' }, '☰'),
      React.createElement('h1', { className: 'text-xl text-white' }, `Hello, ${user.name}!`)
    )
  );
}

function Banner() {
  return (
    React.createElement('div', { className: 'mx-4 mt-4 p-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 shadow md:ml-64' },
      React.createElement('div', { className: 'flex items-center justify-between' },
        React.createElement('p', { className: 'text-white text-lg' }, 'Share your latest AI insights'),
        React.createElement('button', { className: 'bg-white text-gray-800 px-4 py-2 rounded' }, 'Upload Post')
      )
    )
  );
}

function SearchFilters() {
  return (
    React.createElement('div', { className: 'md:ml-64 flex flex-col sm:flex-row justify-between items-center mx-4 my-4' },
      React.createElement('input', { type: 'text', placeholder: 'Search...', 'aria-label': 'Search posts', className: 'mb-2 sm:mb-0 w-full sm:w-1/2 p-2 rounded bg-gray-800 text-gray-100' }),
      React.createElement('div', { className: 'flex space-x-2' },
        ['Country', 'Category', 'Sort'].map(text =>
          React.createElement('select', { key: text, className: 'p-2 rounded bg-gray-800 text-gray-100' },
            React.createElement('option', null, text)
          )
        )
      )
    )
  );
}

function Section({ title, items }) {
  return (
    React.createElement('section', { className: 'bg-gray-800 rounded-lg p-4 shadow' },
      React.createElement('h2', { className: 'text-xl text-white mb-3 font-semibold' }, title),
      React.createElement('ul', { className: 'space-y-2' },
        items.map((item, idx) =>
          React.createElement('li', { key: idx },
            React.createElement('a', { href: item.url, target: '_blank', className: 'text-indigo-400 hover:underline' }, item.title)
          )
        )
      )
    )
  );
}

function MainContent({ data }) {
  const sections = [
    { title: 'Top LLM Models', items: data.llmModels.map(m => ({ title: m.id, url: `https://huggingface.co/${m.id}` })) },
    { title: 'Top Embedding Models', items: data.embeddingModels.map(m => ({ title: m.id, url: `https://huggingface.co/${m.id}` })) },
    { title: 'Top 5 GenAI News', items: data.genaiNews.map(n => ({ title: n.title, url: n.url || n.story_url })) },
    { title: 'Top 5 AI News', items: data.aiNews.map(n => ({ title: n.title, url: n.url || n.story_url })) },
    { title: 'Trending GitHub Repos', items: data.repos.map(r => ({ title: r.full_name, url: r.html_url })) },
    { title: 'Latest Research Papers', items: data.papers },
    { title: 'Popular AI Videos', items: data.videos }
  ];
  return (
    React.createElement('main', { className: 'grid gap-4 mx-4 md:ml-64 lg:mr-64 sm:grid-cols-2 xl:grid-cols-3' },
      sections.map(s => React.createElement(Section, { key: s.title, title: s.title, items: s.items }))
    )
  );
}

function RightPanels() {
  useEffect(() => {
    const ctx = document.getElementById('statsChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Followers', 'Likes', 'Views'],
          datasets: [{
            label: 'Stats',
            data: [12, 19, 3],
            backgroundColor: ['#6366f1', '#ec4899', '#f59e0b']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }, []);

  return (
    React.createElement('aside', { className: 'hidden lg:block w-64 fixed right-0 top-0 bottom-0 bg-gray-900 text-gray-100 p-4 overflow-y-auto' },
      React.createElement('h2', { className: 'text-lg mb-2' }, 'Statistics'),
      React.createElement('div', { className: 'h-40 mb-4' },
        React.createElement('canvas', { id: 'statsChart' })
      ),
      React.createElement('h2', { className: 'text-lg mb-2' }, 'Suggestions'),
      ['Alice', 'Bob', 'Carol'].map(name =>
        React.createElement('div', { key: name, className: 'flex items-center justify-between mb-2' },
          React.createElement('span', null, name),
          React.createElement('button', { className: 'text-sm px-2 py-1 bg-indigo-600 rounded' }, 'Follow')
        )
      )
    )
  );
}

function DashboardApp({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Sidebar, { user: data.user, open: menuOpen }),
      React.createElement(Header, { user: data.user, onMenu: () => setMenuOpen(!menuOpen) }),
      React.createElement(Banner, null),
      React.createElement(SearchFilters, null),
      React.createElement(MainContent, { data: data }),
      React.createElement(RightPanels, null)
    )
  );
}

window.renderDashboard = function(data) {
  ReactDOM.render(
    React.createElement(DashboardApp, { data }),
    document.getElementById('root')
  );
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.__DATA__) {
    window.renderDashboard(window.__DATA__);
  }
});
