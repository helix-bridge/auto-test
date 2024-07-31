# helix bridge auto-test
## TesterService - NestJS

The TesterService is a part of a NestJS application that automates cross-chain transaction testing for various blockchain networks. It periodically schedules and executes tasks to simulate transactions between different chains using different bridge contracts.

### Table of Contents

    • Installation
    • Usage
    • Configuration
    • Service Details


### Installation

To use the TesterService, ensure you have the following dependencies installed in your NestJS project:
```bash
yarn install
```

### Usage

#### Launch the service

The TesterService is initialized on NestJS module startup. It reads configuration data and sets up scheduled tasks to execute cross-chain transactions.
```bash
yarn start
```

#### Scheduled Tasks

The service uses `@nestjs/schedule` to schedule tasks at regular intervals. These tasks are responsible for simulating cross-chain transactions using specified bridge contracts `lnv2/lnv3`.

#### Configuration

The service reads configuration data from local file `/.maintain/configure.json`.

#### Service Details

Classes and Interfaces

    • ChainInfo: Holds information about a blockchain network.
    • BridgeConnectInfo: Contains connection details for a bridge contract.
    • LnProviderInfo: Contains information about a liquidity provider.
    • LnBridge: Represents a bridge with liquidity providers and configuration details.

#### TesterService Methods

`onModuleInit`

This method is called when the module is initialized. It sets up the configuration and schedules tasks for each bridge.

`initConfigure`

Initializes the configuration for chains and bridges. It reads the configuration from the ConfigureService and sets up the necessary data structures.

`requestBridge`

Simulates a real cross-chain transaction using the specified bridge. It constructs the necessary parameters and sends the transaction.

#### Logging

The TesterService logs important events information such as task scheduling, transaction execution, and errors using the NestJS logger.