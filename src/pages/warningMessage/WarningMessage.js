import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ApiUrl } from '../../config/config'

const WarningMessage = () => {

      const [warningData, setWarningData] = useState('')

      useEffect(() => {
            getWarningData()
      }, [])


      const getWarningData = async () => {
            const newResp = await axios.get(`${ApiUrl}getStaticContent`)
            console.log("newResp", newResp?.data?.list[0]?.text);
            setWarningData(newResp?.data?.list[0].text)
      }

      const saveMessage = async () => {
            const newResp = await axios.post(`${ApiUrl}addStaticContent`, {
                  text: warningData,
            })
            getWarningData()
      }


      return (
            <div className="new">
                  <div className="newContainer">
                        {/* <Navbar /> */}
                        <div className="top">
                              <h1>Add Warning Message</h1>
                        </div>
                        <input type='textarea' value={warningData} onChange={(e) => { setWarningData(e.target.value) }} />
                        <button onClick={() => { saveMessage() }}>Save</button>
                        <div></div>
                  </div>
            </div>
      )
}

export default WarningMessage