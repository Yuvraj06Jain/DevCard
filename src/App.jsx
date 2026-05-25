import { useState, useEffect, useRef } from 'react';
import useUserDetails from './utils';
import { AnimatePresence, calcAxisDelta, motion } from 'framer-motion'

function calculate(data){
    if(Number(data) > 1000){
        return (Number(data)/1000).toFixed(1) + 'K';
    }
    
    return data;
}

function InnerBox({
  label,
  count
}){
  return (
    <div className="bg-zinc-900 min-h-10 grow rounded-2xl border-2 border-zinc-950 p-2 shadow-2xl shadow-white/10">
      <div className="text-white/80 font-bold">{label}</div>
      <div className="text-white/80 font-medium">{count}</div>
    </div>
  )
}

function Card({
  name,
  usrname,
  bio,
  countRepos,
  countFollowers,
  countFollowing,
  profilePic,
  joinedOn
}){
  return (
    <div className="w-auto h-auto min-w-150 max-w-180 min-h-80 max-h-68 rounded-3xl p-2 bg-zinc-950/90 border border-black flex flex-col overflow-y-auto">

      {/* Upper Part */}
      <div className="pt-1.5 pb-3 flex justify-center items-center gap-3 ">

        {/* Profile Pic */}
        <div className="w-30 h-30 rounded-full mx-1 py-1 shrink-0 bg-cover bg-no-repeat bg-center brightness-90" style={{backgroundImage: `url(${profilePic})`}}></div>

        {/* Name and Bio */}
        <div className="flex flex-col grow h-full">
          <div className="text-white/80 font-medium text-2xl grow-0 pt-2">{name}</div>
          <div className="text-white/80 text-sm grow-0 ">@{usrname}</div>
          <div className="text-white/80 font-mono grow py-2">{bio}</div>
        </div>
      
      </div>

      {/* <hr className="border-t border-white/30"></hr> */}

      {/* Lower Part */}
      <div className="grow flex justify-evenly items-center gap-2 px-2">
                
        <InnerBox label={"Repos"} count={countRepos} />
        <InnerBox label={"Followers"} count={countFollowers} />
        <InnerBox label={"Following"} count={countFollowing} />
        <InnerBox label={"Joined"} count={joinedOn} />

      </div>
    </div>
  )
}

function Error({error})
{
  return(
    <div className="w-auto h-auto rounded-3xl px-5 py-2 bg-red-800/30 border border-red-900/50 border-dashed">
      <h3 className="font-medium text-red-600 tracking-wider">❌ {error}</h3>
    </div>
  )
}

function Recents({
  recents,
})
{
  return(
    <div className="w-150 py-2 flex justify-start items-center overflow-x-auto scroll-smooth snap-x scrollbar-thin">
            
    {
      recents.slice().reverse().map((e) => (
        <button key={e.login} value={e} className="w-auto p-2 flex justify-center items-center gap-2 shrink-0 snap-center" 
        style={{cursor: 'pointer'}}>
          <div className="w-5 h-5 shrink-0 rounded-full bg-cover bg-no-repeat bg-center" style={{backgroundImage:`url(${e['avatar_url']})`}}>
          </div>
          <div className="text-white/70 text-sm font-medium">{e['login']}</div>
        </button>
      ))
    }

    </div>
  )
}


function App() {
  const [card, setCard] = useState(false);
  const [disableError, setDisableError] = useState(false);
  const [disableAbout, setDisableAbout] = useState(true);

  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState();
  const [recents, setRecents] = useState([]);
  
  const details = useUserDetails(search);

  useEffect(() => {
    if(!search) return

    if(details['message'] === 'Not Found'){
      setDisableError(true);
      setError("User with this username does not exist.");
      setCard(false);
      return;
    }

    setDisableAbout(false);
    setDisableError(false);
    setCard(true);
    setError("");

    const temp = {'avatar_url' : details['avatar_url'], 'login': details['login']};
    setRecents(prev => {
      const filtered = prev.filter(items => items.login !== temp.login)
      return [...filtered, temp]
    })
  },[details])

  const handleSearch = () =>{
    if(input.trim() === '')
    {
      setSearch(null);
      setDisableAbout(false);
      setCard(false);
      setDisableError(true);
      setError("Please Enter a valid username.");
      console.log("HELLOO");
      return;
    }

    setSearch(input);
  }

  return (
    <>
      <div className="w-full h-screen bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://images.pexels.com/photos/13129482/pexels-photo-13129482.jpeg")'}}>
        <h1 className="ml-1 text-8xl w-fit h-fit font-extrabold italic tracking-wider text-white/50">DEVCARD</h1>
        
        {/* About */}
        <AnimatePresence>
          {disableAbout && (
            <motion.h1 key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="text-4xl font-extrabold tracking-wide text-white/70 italic text-center mt-30">
              Make a Profile Card of your Github account
            </motion.h1>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col gap-10 justify-center items-center">

          {/* Search Box */}
          <motion.div animate={{ y: card ? -20 : 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl font-bold tracking-wide text-center py-2 text-white/70">Search Your Github Profile</h1> 
            <input className="w-110 h-10 rounded-4xl bg-white/10 p-4 outline-none text-white" placeholder="Search🔍"
            onChange={(e) => {setInput(e.target.value)}} onKeyDown={(e) => {(e.key === 'Enter') && handleSearch()}}></input>
          </motion.div>

          {/* Card */}
          <AnimatePresence>
            {card && (
              <motion.div key="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} 
              transition={{ duration: 0.4 }}>
              <Card name={details['name']} usrname={details['login']} bio={details['bio']} countRepos={calculate(details['public_repos'])} 
              countFollowers={calculate(details['followers'])} countFollowing={calculate(details['following'])} 
              joinedOn={ details['created_at']? (new Date(details['created_at']).getFullYear()) : null } profilePic={details['avatar_url']} />
              </motion.div>)}
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {disableError && (
              <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} 
              transition={{ duration: 0.4 }}>
              <Error error={error} />
              </motion.div>)}
          </AnimatePresence>

          {/* Recents */}
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm font-medium text-white/90 text-center">Recent Searches</div>
            <Recents recents={recents} />
          </div>
          
        </div>

      </div>
    </>
  )
}

export default App
