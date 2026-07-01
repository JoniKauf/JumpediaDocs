## Overview

Jumpedia is a Discord bot designed for managing structured, community-driven challenges called **Tasks**. A task represents any definable and completable challenge within a community.

<div class="callout" data-type="example">
<strong>Example</strong>

In the *Super Mario Odyssey Trickjump Community*, a task would typically represent a specific trickjump challenge that players attempt to complete.
</div>

### Global System

Jumpedia is built around **communities**, which are independent of any single Discord server.

A server can connect to at most one community at a time. Once connected, it can interact with that community’s data (e.g. tasks, settings, and structure).

Each community has its own staff system with defined ranks and permissions. These staff members can modify community data, while all connected servers can read and display it.

<div class="callout" data-type="example">
<strong>Example</strong>

Consider a community called *Super Mario Bros. Challenges*.

This community exists inside Jumpedia’s database, not on a specific Discord server.

Any server can connect to it and access its data. However, only staff members of that community can modify it, regardless of which Discord server they are currently using—provided the server is connected to the community and they have permission to execute commands there.
</div>