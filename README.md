# debit-credit

Template: 

This is a project to create a simple debit-credit accounting application consisting of accounts, transactions, and a ledger as the core modules. This is different from typical accounting applications available today in that it is meant to be used by experienced accountants and bookkeepers who are familiar with the double-entry accounting system. It is not meant to be used by the general public.

Unlike the typical accouting apps, it will lack the ability to create invoices, maintain customer and vendor records, and wizards to help create trasactions. While those wizards are useful for non-accountants, there is some learning curve to get used to those wizards. It would be nice to have a system that focuses on the core of the double-entry bookkeeping process and thus experience accountants will be able to get up to speed quickly.

I am highly motivated to work on this project because I have the education and work experience both as an accountant and a sofware developer. This puts me in a unique position to be able to bring together my skills from both fields to create a system that is useful to accountants and bookkeepers.


## Project Design

### Overview

This is a web application that will be used by accountants and bookkeepers to create and maintain their accounting records. The template of the project is **Project Idea Title 2: A Collaboration web application**.

### Domain and users

This is a highly specialized bookkeeping application and unlike the famous solutions in the marked e.g. Quickbooks and Xero, it only focuses on the core of the double-entry bookkeeping process and doesn't support most of the wizard based features that these other applications have. There are multiple reasons why such a system might be desireable by the experts:

- Since the users of the application are experts in the field, they arguable don't need these workflows and wizards.
- For an accountant who knows the accounting rules but doesn't know how to use a specific application, they first have to learn the software even though they already have to accounting knowledge. Therefore, for such a user, it would be better to have a raw, back to the basics application that they can use to create and maintain their accounting records.
- Another reason such a user would prefer this application is that it is clutter free and doesn't have any unnecessary features. Accountants will be able to directly work with the ledgers that they have been trained to work with since the beginning of their accounting education and career.
- Such a simple system will also be easier to maintain and audit. So, for highly critical accounting records, this application will be a better choice because there is less chance of errors audit loopholes.

Some of the features of the application are:

* Sign up and login
* Create accounts
* Create transactions with debit and credit entries
* View ledger and transaction history
* View who created and last modified each transaction
* View account balances
* Creating logs of all transactions

Some stretch goals are:

* Admin users can approve or reject transactions e.g. above a certain amount
* Ability to organize accounts into a tree structure and ability to see aggregate balances for each node in the tree
* Managing multiple companies
* Ability to import and export transactions as CSV files

### Technology Stack

The application will designed within Node.js echosystem. The backend will be written in Nest.js which is a Node.js framework. The frontend will be written in Next.js which itself is a React.js framework. The database will be PostgreSQL. While the application may be deployed to cloud. It will be developed, run and demonstrated on a local machine to users for feedback. To facilitate deployment to cloud, the application will be containerized using Docker and docker-compose.
