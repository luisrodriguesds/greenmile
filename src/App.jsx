import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const url_api = 'https://api.github.com';
  const [animate, setAnimate] = useState(false)
  const [find, setFind] = useState(false)
  const [name, setName] = useState('')
  const [user, setUser] = useState({})
  
  useEffect(() => {
  
  }, [])

  useEffect(() => {
    (name !== '' ? setAnimate(true) : setAnimate(false))
  }, [name])

  const onChange = (e) => {
    setName(e.target.value)
    search(e.target.value)
  }
  
  const search = async (name) => {
    try {
      const res = await axios.get(url_api+'/users/'+name)
      setUser({
        avatar_url:res.data.avatar_url,
        login:res.data.login,
        url:res.data.html_url,
        name:res.data.name,
        location:res.data.location,
        bio:res.data.bio,
        repo:{}
      })
      setFind(true)      
    } catch (error) {
      setUser({})
      setFind(false)
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className={(animate ? `animate` : `content`)}>
        <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-6 col-xd-12 col-12">
              <div className="input-wrapper mb-5">
                <div className="logo text-center">
                  <img src="/assets/images/logo.png" />
                  <h3>Buscador de Repositórios</h3>
                </div>
                <form className="form">
                  <div className="topbar">
                    <input type="text" className="form-control mb-4 shadow-lg" id="name" name="name" onChange={(e) => onChange(e)} defaultValue={name} placeholder="Digite o nome ou apelido de um usuário no GitHub" autoComplete="off" />
                  </div>
                  <input type="submit" className="btn btn-block btn-success shadow-lg" value="Buscar" />
                </form>
              </div>
              <div className={(find ? `input-wrapper mb-5 text-white` : `input-wrapper mb-5 text-white display-none`)}>
                <div className="row">
                    <div className="col-3">
                      <div className="avatar">
                        <img src={user.avatar_url} />
                      </div>
                    </div>
                    <div className="col-9 data-user">
                        <div className="name"><strong>{user.name === null ? `Não Informado` : user.name}</strong></div>
                        <div className="login">{user.login}</div>
                        <div className="url"> <a href={user.url} target="_blank">{user.url}</a> </div>
                        <div className="bio">
                          <p>{user.bio}</p>
                        </div>
                    </div>
                </div>
                <div className="row">

                </div>
              </div>
              <div className={(!find && animate ? `input-wrapper mb-5 text-white text-center` : `input-wrapper mb-5 text-white text-center display-none`)}>
                  <h2>Nada encontrado</h2>
              </div>

            </div>
        </div>
      </div>

    </div>
  );
}

export default App;
