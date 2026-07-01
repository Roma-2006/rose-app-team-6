// 'use client';

// import { useState } from 'react';
// import { signIn, signOut, useSession } from 'next-auth/react';

// export default function TestLoginPage() {
//   const { data: session, status } = useSession();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [userData, setUserData] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     setLoading(true);
//     setUserData(null);

//     const res = await signIn('credentials', {
//       username,
//       password,
//       redirect: false,
//     });

//     if (res?.error) {
//       setUserData(`❌ Error: ${res.error}`);
//     } else if (res?.ok) {
//       setUserData('✅ Login successful');
//     } else {
//       setUserData('⚠️ Unknown response');
//     }

//     setLoading(false);
//   };

//   const handleLogout = async () => {
//     await signOut({ redirect: false });
//     setUserData('👋 Logged out');
//   };

//   return (
//     <div style={{ fontFamily: 'monospace', maxWidth: 600, margin: '60px auto', padding: '0 24px' }}>
//       <h1>🔐 Auth Test Page</h1>

//       <section style={{ marginBottom: 32 }}>
//         <h2>Session Status</h2>
//         <p>
//           <strong>status:</strong>{' '}
//           <code
//             style={{
//               color: status === 'authenticated' ? 'green' : status === 'loading' ? 'orange' : 'red',
//             }}
//           >
//             {status}
//           </code>
//         </p>

//         {status === 'authenticated' && session && (
//           <pre
//             style={{
//               background: '#f4f4f4',
//               padding: 16,
//               borderRadius: 8,
//               overflow: 'auto',
//               fontSize: 13,
//             }}
//           >
//             {JSON.stringify(session, null, 2)}
//           </pre>
//         )}
//       </section>

//       {status !== 'authenticated' && (
//         <section style={{ marginBottom: 32 }}>
//           <h2>Login</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               style={{
//                 padding: '8px 12px',
//                 borderRadius: 6,
//                 border: '1px solid #ccc',
//                 fontSize: 14,
//               }}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{
//                 padding: '8px 12px',
//                 borderRadius: 6,
//                 border: '1px solid #ccc',
//                 fontSize: 14,
//               }}
//             />
//             <button
//               onClick={handleLogin}
//               disabled={loading || !username || !password}
//               style={{
//                 padding: '10px 16px',
//                 borderRadius: 6,
//                 border: 'none',
//                 background: loading ? '#aaa' : '#0070f3',
//                 color: '#fff',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 fontSize: 14,
//               }}
//             >
//               {loading ? 'Signing in…' : 'Sign In'}
//             </button>
//           </div>
//         </section>
//       )}

//       {status === 'authenticated' && (
//         <section style={{ marginBottom: 32 }}>
//           <h2>Logout</h2>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: '10px 16px',
//               borderRadius: 6,
//               border: 'none',
//               background: '#e00',
//               color: '#fff',
//               cursor: 'pointer',
//               fontSize: 14,
//             }}
//           >
//             Sign Out
//           </button>
//         </section>
//       )}

//       {userData && (
//         <section>
//           <h2>userData</h2>
//           <p style={{ fontSize: 15 }}>{userData}</p>
//         </section>
//       )}

//       <section style={{ marginTop: 48, borderTop: '1px solid #ddd', paddingTop: 24 }}>
//         <h2>Scenarios to test manually</h2>
//         <ol style={{ lineHeight: 2, fontSize: 14 }}>
//           <li>
//             Login with valid credentials → <code>status</code> becomes{' '}
//             <code style={{ color: 'green' }}>authenticated</code> and session JSON appears
//           </li>
//           <li>
//             Login with wrong password → userData shows{' '}
//             <code style={{ color: 'red' }}>❌ Error</code> from your API message
//           </li>
//           <li>
//             While logged in, navigate to <code>/login</code> → middleware should redirect to
//             homepage
//           </li>
//           <li>
//             While logged out, navigate to <code>/checkout</code> → middleware should redirect to{' '}
//             <code>/login?returnUrl=%2Fcheckout</code>
//           </li>
//           <li>
//             Sign out → <code>status</code> becomes{' '}
//             <code style={{ color: 'red' }}>unauthenticated</code>
//           </li>
//         </ol>
//       </section>
//     </div>
//   );
// }
