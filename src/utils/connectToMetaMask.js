// export const connectToMetamask = async () => {
//     try {
//       // Connect to metamask and get user accounts
//       const accounts = await this.$store.getters['metamask/ethereum'].request({ method: 'eth_requestAccounts' });
      
//       // Update vuex store
//       this.$store.commit('metamask/setMetamaskConnected', true)
//       this.$store.commit('metamask/setAccounts', accounts)
      
//       // Check if user is registered, if not, register them
//       const isRegistered = await this.checkIfUserRegistered(accounts[0])
      
//       // Request nonce from backend
//       const responseNonce = await this.$axios.get('/users/' + accounts[0] + '/nonce')
//       const nonce = responseNonce.data
      
//       // Sign message
//       const signedMessage = await this.handleSignMessage(accounts[0], nonce)
      
//       // Send signature to backend
//       const responseSign = await this.$axios.post('/users/' + accounts[0] + '/signature', signedMessage)
      
//       // Set token in local vuex state store
//       this.$store.commit('metamask/setToken', responseSign.data.token)
      
//       // If successful, redirect to home
//       if (responseSign.status === 200) {
//         this.$router.push('/')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }