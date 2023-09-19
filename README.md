# Consensual Messaging 💌💬

🥇 **Winner** at **ZuzaluHacks September 2023** in the Infrastructure and Public Goods track.

**Consensual Messaging** lets users send messages only when both parties have sent a message. Users encrypt their message, which the contract decrypts. If a matching pair is found in its logs, both users get the message. Otherwise, it awaits a match.

**⚠️ NOTE**: contracts currently do not have private keys, to be tackled using EIP 6551

## 🛠 Tech Stack
- **Frontend**: Next.js
- **Backend**: Express (socket connections)
- **Blockchain**: Smart contracts on Sepolia `0x837BBE5CCb2Bf3d4a8A04cDcf9FF2d120b084cbf`

## 🚀 Getting Started

### Environment Variables
To set up your environment variables:
1. Create a .env.local file in the `frontend/` folder
2. Add the following variable with your own RPC key
   ```
   NEXT_PUBLIC_INFURA=
   ```

### Setting Up the Project
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install all necessary dependencies:
   ```bash
   yarn install
   ```

### Running the Project
1. Fire up the socket server:
   ```bash
   node index.js
   ```
2. Launch the web app:
   ```bash
   yarn dev
   ```

## 🖼 Slide Deck Pitch

[View our pitch deck here!](https://docs.google.com/presentation/d/1KXlJnmG9i7lC6GE0b-KjRdrnNP7GUXiXnUEbOwTirWI/edit?usp=sharing)

## 👨‍🎓 Team
- **Tim Guo**
- **Trevor Trinh**
- **Desmond Lai**

## 🙋‍♂️ Got Questions or Suggestions?
Feel free to open an issue or submit a pull request! We appreciate all feedback, as it helps us improve and grow the project. 🌱
