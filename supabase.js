const { createClient } = require("@supabase/supabase-js")

const apiKey = process.env.EXPO_PUBLIC_API_KEY
const apiUrl = process.env.EXPO_PUBLIC_API_URL

export const supabase = createClient(apiUrl, apiKey)