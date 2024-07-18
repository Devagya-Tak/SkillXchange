import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '@/supabase'

const AdditionalInformation = () => {
    interface Skill {
        name?: string
    }
    const [username, setUsername] = useState('')
    const [pfpUrl, setPfpUrl] = useState('')
    const [skills, setSkills] = useState<Skill[] >([])
    const handleProfile = async () => { 
        const { error } = await supabase
            .from('profiles')
            .insert({
                username,
                pfp_url: pfpUrl,
                skills
            })
     }
  return (
    <View>
      <Text>AdditionalInformation</Text>
    </View>
  )
}

export default AdditionalInformation