"""
LG Factory Engine — Anthropic Admin API Adapter
Handles workspace and API key management via Organizations API.

Requires: ANTHROPIC_ADMIN_API_KEY (separate from regular API key)
"""

import os
import json
from dataclasses import dataclass
from typing import Optional
from urllib.request import Request, urlopen
from urllib.error import HTTPError


BASE_URL = "https://api.anthropic.com/v1/organizations"
API_VERSION = "2023-06-01"


@dataclass
class Workspace:
    id: str
    name: str
    created_at: str
    archived_at: Optional[str] = None
    status: str = "active"


@dataclass
class APIKeyInfo:
    id: str
    name: str
    status: str
    partial_key_hint: str
    created_at: str
    workspace_id: Optional[str] = None
    created_by: Optional[dict] = None


@dataclass
class PaginatedResponse:
    data: list
    first_id: str
    last_id: str
    has_more: bool


class AnthropicAdminClient:
    """Client for Anthropic Organizations API."""

    def __init__(self, admin_api_key: str = None):
        self.admin_key = admin_api_key or os.environ.get("ANTHROPIC_ADMIN_API_KEY")
        if not self.admin_key:
            raise EnvironmentError(
                "Set ANTHROPIC_ADMIN_API_KEY environment variable "
                "(Organization API key, not a regular API key)"
            )

    def _request(self, method: str, path: str, body: dict = None, params: dict = None) -> dict:
        """Make an authenticated request to the Anthropic admin API."""
        url = f"{BASE_URL}{path}"
        if params:
            query = "&".join(f"{k}={v}" for k, v in params.items() if v is not None)
            if query:
                url += f"?{query}"

        headers = {
            "Content-Type": "application/json",
            "anthropic-version": API_VERSION,
            "X-Api-Key": self.admin_key,
        }

        data = json.dumps(body).encode("utf-8") if body else None
        req = Request(url, data=data, headers=headers, method=method)

        try:
            with urlopen(req) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except HTTPError as e:
            error_body = e.read().decode("utf-8") if e.fp else ""
            raise RuntimeError(f"API error {e.code}: {error_body}") from e

    # ─── WORKSPACES ────────────────────────────────────────────

    def list_workspaces(self, limit: int = 20) -> PaginatedResponse:
        """List all workspaces."""
        data = self._request("GET", "/workspaces", params={"limit": limit})
        workspaces = [Workspace(**w) for w in data.get("data", [])]
        return PaginatedResponse(
            data=workspaces,
            first_id=data.get("first_id", ""),
            last_id=data.get("last_id", ""),
            has_more=data.get("has_more", False),
        )

    def create_workspace(self, name: str) -> Workspace:
        """Create a new workspace."""
        data = self._request("POST", "/workspaces", body={"name": name})
        return Workspace(**data)

    def get_workspace(self, workspace_id: str) -> Workspace:
        """Get a workspace by ID."""
        data = self._request("GET", f"/workspaces/{workspace_id}")
        return Workspace(**data)

    # ─── API KEYS ──────────────────────────────────────────────

    def list_api_keys(
        self,
        limit: int = 20,
        status: str = None,
        workspace_id: str = None,
        after_id: str = None,
        before_id: str = None,
    ) -> PaginatedResponse:
        """List API keys with optional filters."""
        params = {"limit": limit}
        if status:
            params["status"] = status
        if workspace_id:
            params["workspace_id"] = workspace_id
        if after_id:
            params["after_id"] = after_id
        if before_id:
            params["before_id"] = before_id

        data = self._request("GET", "/api_keys", params=params)
        keys = [APIKeyInfo(**k) for k in data.get("data", [])]
        return PaginatedResponse(
            data=keys,
            first_id=data.get("first_id", ""),
            last_id=data.get("last_id", ""),
            has_more=data.get("has_more", False),
        )

    def create_api_key(
        self,
        name: str,
        workspace_id: str = None,
        type: str = "api_key",
    ) -> dict:
        """Create a new API key in a workspace."""
        body = {"name": name, "type": type}
        if workspace_id:
            body["workspace_id"] = workspace_id
        return self._request("POST", "/api_keys", body=body)
