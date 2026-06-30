## Overview

Jumpedia is a Discord bot that has a very specific use case. It allows communities to easily create, delete and manage so called `Tasks`. A task is an abstract term to describe any completable challenge.

<div class="custom-example">
<strong>Example:</strong>

A task in the `Super Mario Odyssey Trickjump Community` would be a trickjump.
</div>

### Global System
Jumpedia is made up of communities. A community is not bound to a single server though. Instead, a server can connect to at most one community at a time and then interact with it. 

Each community has staff with specific community ranks, which are able to modify data of the given community. The data can be read from any server though, as long as it is connected to the desired community.

<div class="custom-example">
<strong>Example:</strong>

Assume a community called `Super Mario Bros. Challenges` exists. This community does not exist on any specific server, but inside of Jumpedia's database. Any server can connect to this community and read all of its data. Only staff of `Super Mario Bros. Challenges` can edit the data though, no matter on which Discord server they may be on (as long as they can use commands on that server and the server is connected to the community `Super Mario Bros. Challenges`).
</div>