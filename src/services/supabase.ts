/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { definitions } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://inbmfyzbytmwbkzvwmlz.supabase.co'
const supabaseKey = import.meta.env.VITE_SB_PUBLIC + ''
const supabase = createClient(supabaseUrl, supabaseKey)

export const { auth } = supabase
export const chatsDB = () => supabase.from<definitions['chats']>('chats')
export const usersDB = () => supabase.from<definitions['users']>('users')
