<aside id="sidebar" class="sidebar">

<ul class="sidebar-nav" id="sidebar-nav">

  <li class="nav-item">
    <a class="nav-link collapsed" href="index">
      <i class="bi bi-grid"></i>
      <span>Dashboard</span>
    </a>
  </li><!-- End Dashboard Nav -->

  <!-- <li class="nav-heading">Pages</li> -->
<?php if(userpermission("CanManageProducts")){ ?>
  <li class="nav-item">
    <a class="nav-link collapsed" href="Products">
      <i class="bi bi-list-ul"></i>
      <span>Products</span>
    </a>
  </li>
<?php } ?>

<?php if(userpermission("CanManageInventory")){ ?>
  <li class="nav-item">
    <a class="nav-link collapsed" href="Inventory">
      <i class="bi bi-list-ul"></i>
      <span>Inventory</span>
    </a>
  </li>
<?php } ?>

<?php if(userpermission("CanManageCategory")){ ?>
  <li class="nav-item">
    <a class="nav-link collapsed" href="ProductCategory">
      <i class="bi bi-tag"></i>
      <span>Category</span>
    </a>
  </li>
<?php } ?>

  <li class="nav-item">
    <a class="nav-link collapsed" href="Vendors">
      <i class="bi bi-person"></i>
      <span>Vendors</span>
    </a>
  </li>

  <li class="nav-item">
    <a class="nav-link collapsed" href="pages-login.html">
      <i class="bi bi-shop"></i>
      <span>Stores</span>
    </a>
  </li>

  <li class="nav-item">
    <a class="nav-link collapsed" href="Customers">
      <i class="bi bi-person"></i>
      <span>Customers</span>
    </a>
  </li>

  <li class="nav-item">
    <a class="nav-link collapsed" href="AddOrder">
      <i class="bi bi-cart-check"></i>
      <span>Orders</span>
    </a>
  </li>

  <?php 
if(userpermission("CanManageUser")){ ?>
  <li class="nav-item">
    <a class="nav-link collapsed" href="Users">
      <i class="bi bi-people"></i>
      <span>CRM Users</span>
    </a>
  </li>
<?php } ?>

<?php 
if(userpermission("CanManageUserRoles")){ ?>

  <li class="nav-item">
    <a class="nav-link collapsed" href="UserRoles">
      <i class="bi bi-columns-gap"></i>
      <span>User Roles</span>
    </a>
  </li>

<?php } ?>
</ul>

</aside><!-- End Sidebar-->