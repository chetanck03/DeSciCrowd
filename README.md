# DeSciCrowd

*Transparent, Decentralized, and Reproducible Science Funding via Solana*
---

## Introduction

DeSciCrowd is a decentralized crowdfunding platform built on the Solana blockchain using Anchor, Next.js, and Tailwind CSS. It enables researchers to create, manage, and fund scientific research campaigns in a transparent, secure, and outcome-driven manner. The platform uses milestone-based funding with community-driven peer review, incentivized by tokens, to ensure reproducibility and trust in scientific outcomes.

---
## Demo Video/PPT

[Demo Video](https://youtu.be/vKDrZrJt3DQ)

[PPT Presentation](https://docs.google.com/presentation/d/1KLke3rNYH51FUw5rI68PVYxU0vw5ah7t/edit?slide=id.p1#slide=id.p1)

---

## Features

- Create and manage decentralized science funding campaigns
- Donate to campaigns with milestone-based disbursements
- Transparent, auditable funding flow powered by Solana smart contracts
- Wallet integration with Phantom and WalletConnect
- Community peer review with token incentives
- Responsive frontend built with Next.js and Tailwind CSS

---

## Technologies Used

- Solana Blockchain & Anchor Framework for smart contracts
- Next.js for frontend React application
- Tailwind CSS for styling
- Phantom.js and WalletConnect for wallet integration
- Node.js and JavaScript for backend and scripting

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Anchor CLI](https://www.anchor-lang.com/docs/installation)
- [Solana CLI](https://solana.com/docs/intro/installation)
 
---
### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/chetanck03/DeSciCrowd.git
    cd DeSciCrowd
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```    
---
## Usage

### Running the Application

1.  Start the development server:

    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.
---
### Building the Project

```bash
npm run build
```

### Running Anchor Tests

```bash
anchor test
```
---

## Project Structure

```
.
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── anchor/
│   ├── Anchor.toml
│   ├── programs/
│   │   └── fundus/
│   │       ├── src/
│   │       │   ├── lib.rs
│   │       │   ├── instructions/
│   │       │   │   ├── create_campaign.rs
│   │       │   │   ├── delete_campaign.rs
│   │       │   │   ├── donate.rs
│   │       │   │   ├── initialize.rs
│   │       │   │   ├── mod.rs
│   │       │   │   ├── update_campaign.rs
│   │       │   │   ├── update_platform_settings.rs
│   │       │   │   └── withdraw.rs
│   │       │   ├── states/
│   │       │   │   ├── campaign.rs
│   │       │   │   ├── mod.rs
│   │       │   │   ├── program_state.rs
│   │       │   │   └── transaction.rs
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── react-query-provider.tsx
│   │   ├── account/
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── list_campaigns/
│   │   │   │   └── route.ts
│   │   │   ├── public_balance/
│   │   │   │   └── route.ts
│   │   │   └── show_campaign/
│   │   │       └── route.ts
│   │   ├── campaign/
│   │   │   ├── [cid]/
│   │   │   │   └── page.tsx
│   │   │   └── edit/
│   │   │       └── [cid]/
│   │   │           └── page.tsx
│   │   └── create/
│   │       └── page.tsx
│   ├── components/
│   │   ├── AppWalletProvider.tsx
│   │   ├── CampaignCard.tsx
│   │   ├── CampaignDetails.tsx
│   │   ├── CampaignDonate.tsx
│   │   ├── CampaignHero.tsx
│   │   ├── DeleteModal.tsx
│   │   ├── DonationsList.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── PlatformSettings.tsx
│   │   ├── WithdrawalList.tsx
│   │   └── WithdrawModal.tsx
│   ├── data/
│   │   └── index.ts
│   ├── services/
│   │   └── blockchain.tsx
│   ├── store/
│   │   ├── globalSlices.ts
│   │   ├── index.ts
│   │   ├── actions/
│   │   │   └── globalActions.ts
│   │   └── states/
│   │       └── globalStates.ts
│   ├── utils/
│   │   ├── helper.ts
│   │   └── interfaces.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```
---

## Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Submit a pull request with a clear description of your changes.

---
## License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute it.

---
Thank you for checking out DeSciCrowd! Together, we can make science funding more transparent and reproducible.
